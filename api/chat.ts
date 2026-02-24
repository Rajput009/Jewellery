import { hasSupabaseEnv, requireSupabase } from '../lib/supabaseClient';
import { recommendProducts } from './products';
import { ApiError } from './errors';

export type ChatRecommendation = {
  id: string;
  name: string;
  price: string;
  reason: string;
};

export type ChatReply = {
  text: string;
  recommendations: ChatRecommendation[];
};

const toReason = (query: string, name: string) => {
  const lower = query.toLowerCase();
  if (/wedding|shaadi|shadi/.test(lower)) return `${name} fits wedding/bridal styling.`;
  if (/office|daily|rozana/.test(lower)) return `${name} works for daily, wearable elegance.`;
  if (/black|kala|siyah/.test(lower)) return `${name} pairs well with deep and black outfits.`;
  return `${name} aligns with your style and tone preference.`;
};

const fallbackChatReply = async (query: string): Promise<ChatReply> => {
  const products = await recommendProducts({ query, limit: 3 });
  const recommendations = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.priceLabel,
    reason: toReason(query, product.name),
  }));

  return {
    text:
      recommendations.length > 0
        ? `Based on your preference, these are strong picks: ${recommendations.map((item) => item.name).join(', ')}.`
        : 'Tell me your occasion, dress color, and skin tone and I can recommend jewelry.',
    recommendations,
  };
};

export const getChatRecommendations = async (query: string, locale = 'en'): Promise<ChatReply> => {
  if (!query.trim()) {
    return {
      text: 'Share your occasion, outfit color, and skin tone. Aap Roman Urdu ya English dono mein pooch sakte hain.',
      recommendations: [],
    };
  }

  if (!hasSupabaseEnv) return fallbackChatReply(query);

  const supabase = requireSupabase();
  const sessionKey = 'chat_session_id';
  const sessionId = window.localStorage.getItem(sessionKey) ?? crypto.randomUUID();
  window.localStorage.setItem(sessionKey, sessionId);
  const { data, error } = await supabase.functions.invoke('chat-recommend', {
    body: {
      query,
      locale,
    },
    headers: {
      'x-session-id': sessionId,
    },
  });

  if (error) {
    throw new ApiError(`Chat service unavailable: ${error.message}`, 'BACKEND_UNAVAILABLE', {
      status: 503,
      cause: error,
    });
  }
  if (!data) {
    throw new ApiError('Chat service unavailable: empty response.', 'BACKEND_UNAVAILABLE', {
      status: 503,
    });
  }

  return {
    text: data.reply_text ?? 'Here are some recommendations for you.',
    recommendations: (data.recommendations ?? []).map((entry: any) => ({
      id: entry.id,
      name: entry.name,
      price: entry.price,
      reason: entry.reason,
    })),
  };
};
