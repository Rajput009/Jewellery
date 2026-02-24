import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import { z } from 'npm:zod@4.3.6';

const addressSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  line1: z.string().min(3).max(200),
  city: z.string().min(1).max(100),
  state: z.string().max(100).optional().default(''),
  postalCode: z.string().min(2).max(20),
  country: z.string().min(2).max(80),
  email: z.string().email(),
});

const payloadSchema = z.object({
  shipping_address: addressSchema,
  billing_address: addressSchema,
  notes: z.string().max(1200).optional(),
  idempotency_key: z.string().min(8).max(200),
});

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
    },
  });

Deno.serve(async (request) => {
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();
  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed', request_id: requestId });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(`[checkout-create-order:${requestId}] Missing Supabase env vars`);
    return json(500, { error: 'Server configuration error', request_id: requestId });
  }

  const authorization = request.headers.get('authorization') ?? '';
  if (!authorization.startsWith('Bearer ')) {
    return json(401, { error: 'Missing bearer token', request_id: requestId });
  }

  const token = authorization.replace('Bearer ', '').trim();

  const serviceClient = createClient(supabaseUrl, serviceRoleKey);

  const { data: authData, error: authError } = await serviceClient.auth.getUser(token);
  if (authError || !authData.user) {
    console.error(`[checkout-create-order:${requestId}] Unauthorized`, authError);
    return json(401, { error: 'Unauthorized', request_id: requestId });
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

  const authorizedServiceClient = createClient(supabaseUrl, serviceRoleKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data, error } = await authorizedServiceClient.rpc('create_order_from_cart', {
    input: {
      shipping_address: parsed.data.shipping_address,
      billing_address: parsed.data.billing_address,
      notes: parsed.data.notes,
      idempotency_key: parsed.data.idempotency_key,
      currency: 'USD',
    },
  });

  if (error) {
    console.error(`[checkout-create-order:${requestId}] RPC error`, error);
    return json(400, { error: error.message, request_id: requestId });
  }

  return json(200, {
    order_id: data?.order_id,
    order_number: data?.order_number,
    already_exists: data?.already_exists ?? false,
    request_id: requestId,
  });
});
