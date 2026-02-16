import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { trackEvent } from '../services/analytics';

type CartPageProps = {
  onContinueShopping?: () => void;
  onProceedToCheckout?: () => void;
  onOpenProduct?: (productId: string) => void;
};

const CartPage: React.FC<CartPageProps> = ({ onContinueShopping, onProceedToCheckout, onOpenProduct }) => {
  React.useEffect(() => {
    trackEvent('view_upsell', { placement: 'cart', section: 'add_these_to_match' });
    trackEvent('view_upsell', { placement: 'cart', section: 'luxury_care_and_protection' });
  }, []);

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
      <p className="mt-2 text-sm text-[#6F6F6F]">2 items reserved for your order.</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-[#0E4F3C]">Complete checkout now to keep complimentary shipping</p>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {[
            {
              name: 'Eternal Diamond Solitaire',
              details: '18k Yellow Gold - Size 6',
              price: '$2,450',
              image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=500&auto=format&fit=crop',
            },
            {
              name: 'Infinity Vine Band',
              details: '14k Yellow Gold - Size 6',
              price: '$950',
              image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop',
            },
          ].map((item) => (
            <article key={item.name} className="bg-white border border-[rgba(198,167,94,0.22)] p-4 md:p-5 flex flex-col sm:flex-row gap-4">
              <img src={item.image} alt={item.name} className="w-full sm:w-28 h-28 object-cover border border-[rgba(198,167,94,0.2)]" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold">{item.name}</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1 uppercase tracking-widest">{item.details}</p>
                  </div>
                  <p className="font-semibold">{item.price}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-[rgba(198,167,94,0.3)]">
                    <button type="button" className="px-3 py-2 hover:bg-[#EFE7DA]"><Minus size={14} /></button>
                    <span className="px-4 text-sm">1</span>
                    <button type="button" className="px-3 py-2 hover:bg-[#EFE7DA]"><Plus size={14} /></button>
                  </div>
                  <button type="button" className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[#0E4F3C] hover:text-[#B8954C]">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-6 h-fit">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0E4F3C]">Order Summary</h3>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>$3,400.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Complimentary</span></div>
            <div className="flex justify-between"><span>Estimated Tax</span><span>$272.00</span></div>
            <div className="flex justify-between pt-4 border-t border-[rgba(198,167,94,0.25)] text-base font-semibold"><span>Total</span><span>$3,672.00</span></div>
          </div>

          <button
            type="button"
            onClick={() => {
              trackEvent('click_upsell', { placement: 'cart', action: 'proceed_to_checkout' });
              onProceedToCheckout?.();
            }}
            className="mt-6 w-full py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
          >
            Checkout
          </button>
          <p className="mt-3 text-[11px] text-[#4D4D4D]">
            Most customers complete checkout in under 2 minutes.
          </p>

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
          {[
            { id: 'c-watch-1', name: 'Green Dial Gold Watch', price: '$4,250' },
            { id: 'c1', name: 'Slim Gold Bracelet', price: '$980' },
            { id: 'c6', name: 'Emerald Pendant Necklace', price: '$1,680' },
          ].map((item) => (
            <article key={item.name} className="bg-white border border-[rgba(198,167,94,0.2)] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F]">Style Pairing</p>
              <p className="mt-1 font-medium">{item.name}</p>
              <p className="text-[#0E4F3C] font-semibold">{item.price}</p>
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
