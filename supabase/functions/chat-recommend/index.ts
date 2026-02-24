import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import { z } from 'npm:zod@4.3.6';

const payloadSchema = z.object({
  query: z.string().min(2).max(500),
  locale: z.string().optional().default('en'),
});

const romanUrduMap: Record<string, string[]> = {
  shaadi: ['wedding', 'bridal', 'formal'],
  shadi: ['wedding', 'bridal', 'formal'],
  mehndi: ['party', 'formal', 'green', 'gold'],
  valima: ['formal', 'wedding', 'statement'],
  dawat: ['party', 'formal'],
  kapray: ['dress'],
  kapre: ['dress'],
  rang: ['color'],
  kala: ['black'],
  siyah: ['black'],
  safed: ['white'],
  laal: ['red'],
  hara: ['green'],
  neela: ['blue'],
  sunehri: ['gold'],
  chandi: ['silver'],
  garam: ['warm'],
  thanda: ['cool'],
  rozana: ['daily', 'casual'],
  tohfa: ['gift'],
};

const formatPrice = (cents: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const tokenize = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const enrichTokens = (tokens: string[]) => {
  const enriched = new Set(tokens);
  tokens.forEach((token) => {
    const mapped = romanUrduMap[token];
    if (mapped) mapped.forEach((item) => enriched.add(item));
  });
  return [...enriched];
};

const textReason = (query: string, product: any) => {
  const lower = query.toLowerCase();
  if (/wedding|shaadi|shadi|engagement/.test(lower)) {
    return `${product.name} complements bridal and formal looks.`;
  }
  if (/office|daily|rozana|casual/.test(lower)) {
    return `${product.name} is versatile for daily styling.`;
  }
  if (/warm|gold|sunehri/.test(lower)) {
    return `${product.name} pairs well with warm tones.`;
  }
  if (/cool|silver|chandi|blue|neela/.test(lower)) {
    return `${product.name} works well with cool-tone outfits.`;
  }
  return `${product.name} aligns with your stated occasion and style.`;
};

const maybeEnhanceWithLlm = async (
  query: string,
  locale: string,
  baseReply: string,
  recommendationNames: string[],
): Promise<string> => {
  const llmEnabled = Deno.env.get('CHAT_LLM_ENABLED') === 'true';
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  const model = Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini';

  if (!llmEnabled || !apiKey || !apiKey.trim()) return baseReply;

  const prompt = `User query: ${query}\nLocale: ${locale}\nRecommendations: ${recommendationNames.join(', ')}\nWrite a concise luxury jewelry assistant reply in under 45 words.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 100,
      messages: [
        {
          role: 'system',
          content:
            'You are a jewelry stylist assistant. Do not change product names. Keep response concise and premium. Never output pricing decisions or policy claims.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) return baseReply;

  const body = await response.json();
  const message = body?.choices?.[0]?.message?.content;
  if (typeof message !== 'string' || message.trim().length === 0) return baseReply;

  return message.trim();
};

Deno.serve(async (request) => {
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();
  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed', request_id: requestId });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    console.error(`[chat-recommend:${requestId}] Missing Supabase env vars`);
    return json(500, { error: 'Server configuration error', request_id: requestId });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON body', request_id: requestId });
  }

  const parsed = payloadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return json(400, {
      error: 'Invalid request payload',
      details: parsed.error.flatten(),
      request_id: requestId,
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const ipHeader = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const ip = ipHeader.split(',')[0].trim();
  const sessionId = request.headers.get('x-session-id') ?? crypto.randomUUID();
  const ipHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  const ipDigest = Array.from(new Uint8Array(ipHash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  await supabase.from('chat_rate_limits').insert({
    session_id: sessionId,
    ip_hash: ipDigest,
  });

  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from('chat_rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('ip_hash', ipDigest)
    .gte('created_at', since);

  if ((count ?? 0) > 30) {
    return json(429, { error: 'Rate limit exceeded. Please try again shortly.', request_id: requestId });
  }

  const query = parsed.data.query;
  const locale = parsed.data.locale;
  const tokens = enrichTokens(tokenize(query));

  const { data: products, error } = await supabase.rpc('recommend_products', {
    input: {
      query: [query, ...tokens].join(' '),
      limit: 3,
    },
  });

  if (error) {
    console.error(`[chat-recommend:${requestId}] RPC error`, error);
    return json(400, { error: error.message, request_id: requestId });
  }

  const recommendations = (products ?? []).slice(0, 3).map((product: any) => ({
    id: product.public_id,
    name: product.name,
    price: formatPrice(product.price_cents, product.currency),
    reason: textReason(query, product),
  }));

  let replyText =
    locale.toLowerCase().startsWith('ur') || /shaadi|shadi|kapray|rang|garam|thanda/i.test(query)
      ? `Aap ki preferences ke mutabiq yeh pieces suitable hain: ${recommendations.map((r) => r.name).join(', ')}.`
      : `Based on your preferences, these pieces are strong matches: ${recommendations.map((r) => r.name).join(', ')}.`;

  if (recommendations.length === 0) {
    replyText =
      locale.toLowerCase().startsWith('ur')
        ? 'Apni occasion, dress color, aur skin tone batain. Main tailored recommendations doon ga.'
        : 'Tell me your occasion, dress color, and skin tone. I will recommend matching pieces.';
  }

  replyText = await maybeEnhanceWithLlm(
    query,
    locale,
    replyText,
    recommendations.map((item) => item.name),
  );

  return json(200, {
    session_id: sessionId,
    reply_text: replyText,
    recommendations,
    request_id: requestId,
  });
});
