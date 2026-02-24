import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { trackEvent } from '../services/analytics';
import { cartTotals, getCartItems, removeCartItem, updateCartItemQuantity } from '../api/cart';
import { recommendProducts } from '../api/products';
import type { CartItemView, ProductCard } from '../api/types';
import { getCurrentUser } from '../api/auth';

type CartPageProps = {
  onContinueShopping?: () => void;
  onProceedToCheckout?: () => void;
  onOpenProduct?: (productId: string) => void;
};

const CartPage: React.FC<CartPageProps> = ({ onContinueShopping, onProceedToCheckout, onOpenProduct }) => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<CartItemView[]>([]);
  const [pairings, setPairings] = React.useState<ProductCard[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartItems = await getCartItems();
      setItems(cartItems);
      const picks = await recommendProducts({
        query: cartItems.map((item) => item.name).join(' ') || 'ring',
        limit: 3,
      });
      setPairings(picks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load cart.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    trackEvent('view_upsell', { placement: 'cart', section: 'add_these_to_match' });
    trackEvent('view_upsell', { placement: 'cart', section: 'luxury_care_and_protection' });
    void refresh();
  }, [refresh]);

  const totals = cartTotals(items);
  const redirectToLogin = React.useCallback(() => {
    navigate('/login?redirect=%2Fcheckout');
  }, [navigate]);

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C]/70">
        <span className="text-[#0E4F3C] font-bold">Bag</span>
        <span>/</span>
        <span>Checkout</span>
        <span>/</span>
        <span>Confirmation</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-light">Your Bag</h1>
      <p className="mt-2 text-sm text-[#6F6F6F]">{items.length} items reserved for your order.</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-[#0E4F3C]">Complete checkout now to keep complimentary shipping</p>
      {loading ? <p className="mt-2 text-sm text-[#6F6F6F]">Loading cart...</p> : null}
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="bg-white border border-[rgba(198,167,94,0.22)] p-4 md:p-5 flex flex-col sm:flex-row gap-4">
              <img src={item.image} alt={item.name} className="w-full sm:w-28 h-28 object-cover border border-[rgba(198,167,94,0.2)]" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold">{item.name}</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1 uppercase tracking-widest">{item.details}</p>
                  </div>
                  <p className="font-semibold">${(item.totalPriceCents / 100).toLocaleString()}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-[rgba(198,167,94,0.3)]">
                    <button
                      type="button"
                      className="px-3 py-2 hover:bg-[#EFE7DA]"
                      onClick={async () => {
                        await updateCartItemQuantity(item.id, item.quantity - 1);
                        await refresh();
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      className="px-3 py-2 hover:bg-[#EFE7DA]"
                      onClick={async () => {
                        await updateCartItemQuantity(item.id, item.quantity + 1);
                        await refresh();
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[#0E4F3C] hover:text-[#B8954C]"
                    onClick={async () => {
                      await removeCartItem(item.id);
                      await refresh();
                    }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
          {!loading && items.length === 0 ? <p className="text-sm text-[#6F6F6F]">Your bag is empty.</p> : null}
        </div>

        <aside className="bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-6 h-fit">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0E4F3C]">Order Summary</h3>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{totals.subtotalLabel}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{totals.shippingLabel}</span></div>
            <div className="flex justify-between"><span>Estimated Tax</span><span>{totals.taxLabel}</span></div>
            <div className="flex justify-between pt-4 border-t border-[rgba(198,167,94,0.25)] text-base font-semibold"><span>Total</span><span>{totals.totalLabel}</span></div>
          </div>

          <button
            type="button"
            onClick={() => {
              trackEvent('click_upsell', { placement: 'cart', action: 'proceed_to_checkout' });
              void (async () => {
                try {
                  const user = await getCurrentUser();
                  if (!user) {
                    redirectToLogin();
                    return;
                  }
                  onProceedToCheckout?.();
                } catch {
                  redirectToLogin();
                }
              })();
            }}
            className="mt-6 w-full py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
          >
            Checkout
          </button>
          <p className="mt-3 text-[11px] text-[#4D4D4D]">Most customers complete checkout in under 2 minutes.</p>

          <button
            type="button"
            onClick={onContinueShopping}
            className="mt-3 w-full py-3 border border-[rgba(198,167,94,0.5)] text-[#0E4F3C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/60 transition-colors"
          >
            Continue Shopping
          </button>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-light">Add These to Match</h2>
        <p className="mt-2 text-sm text-[#4D4D4D]">Stylist-selected cross-sell picks in the same tone and setting.</p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {pairings.map((item) => (
            <article key={item.id} className="bg-white border border-[rgba(198,167,94,0.2)] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F]">Style Pairing</p>
              <p className="mt-1 font-medium">{item.name}</p>
              <p className="text-[#0E4F3C] font-semibold">{item.priceLabel}</p>
              <button
                type="button"
                onClick={() => {
                  trackEvent('click_upsell', { placement: 'cart', section: 'add_these_to_match', product_id: item.id });
                  onOpenProduct?.(item.id);
                }}
                className="mt-3 text-xs uppercase tracking-widest text-[#0E4F3C] font-semibold hover:text-[#B8954C]"
              >
                Add
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-5">
        <h3 className="text-lg font-medium">Luxury Care & Protection</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {[
            { key: 'cleaning_kit', label: 'Jewelry Cleaning Kit (+$45)' },
            { key: 'gift_packaging', label: 'Gift Packaging Upgrade (+$30)' },
            { key: 'one_year_protection', label: 'One-Year Protection (+$120)' },
          ].map((addon) => (
            <label key={addon.key} className="bg-white border border-[rgba(198,167,94,0.2)] p-3 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#0E4F3C]"
                onChange={(event) =>
                  trackEvent('accept_addon', {
                    placement: 'cart',
                    addon: addon.key,
                    accepted: event.currentTarget.checked,
                  })
                }
              />
              {addon.label}
            </label>
          ))}
        </div>
      </section>
    </section>
  );
};

export default CartPage;
