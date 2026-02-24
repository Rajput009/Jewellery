import { clearLocalCart } from './cart';
import { hasSupabaseEnv, requireSupabase } from '../lib/supabaseClient';
import { getCurrentUser } from './auth';
import { ApiError } from './errors';

export type CheckoutPayload = {
  shippingAddress: {
    firstName: string;
    lastName: string;
    line1: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    email: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    line1: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    email: string;
  };
  notes?: string;
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalCents: number;
  currency: string;
  createdAt: string;
};

const randomOrderNumber = () => `ELX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
const ORDER_NUMBER_REGEX = /^ELX-\d{8}-[A-Z0-9]{8}$/;

export const createOrderFromCheckout = async (payload: CheckoutPayload): Promise<{ orderNumber: string }> => {
  if (!hasSupabaseEnv) {
    const orderNumber = randomOrderNumber();
    window.localStorage.setItem('latest_order_number', orderNumber);
    clearLocalCart();
    return { orderNumber };
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Please sign in to complete your order.');
  }

  const supabase = requireSupabase();
  const idempotencyKey = crypto.randomUUID();

  const { data, error } = await supabase.functions.invoke('checkout-create-order', {
    body: {
      shipping_address: payload.shippingAddress,
      billing_address: payload.billingAddress,
      notes: payload.notes,
      idempotency_key: idempotencyKey,
    },
  });

  if (error) throw error;
  if (!data?.order_number) throw new Error('Order creation failed: missing order number');

  return { orderNumber: data.order_number as string };
};

export const getOrderByOrderNumber = async (orderNumber: string): Promise<OrderSummary | null> => {
  const normalized = orderNumber.trim().toUpperCase();
  if (!normalized) return null;
  if (!ORDER_NUMBER_REGEX.test(normalized)) {
    throw new ApiError('Invalid order number format.', 'VALIDATION_FAILED', { status: 400 });
  }

  if (!hasSupabaseEnv) {
    const cached = window.localStorage.getItem('latest_order_number');
    if (cached !== normalized) return null;

    return {
      id: 'local-order',
      orderNumber: normalized,
      status: 'pending',
      paymentStatus: 'pending_manual',
      totalCents: 367200,
      currency: 'USD',
      createdAt: new Date().toISOString(),
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new ApiError('Please sign in to view your order.', 'AUTH_REQUIRED', { status: 401 });
  }

  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('id,order_number,status,payment_status,total_cents,currency,created_at')
    .eq('order_number', normalized)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    orderNumber: data.order_number,
    status: data.status,
    paymentStatus: data.payment_status,
    totalCents: data.total_cents,
    currency: data.currency,
    createdAt: data.created_at,
  };
};
