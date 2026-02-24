import React from 'react';
import { CheckCircle2, CreditCard, Mail, Phone, Printer, Truck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../services/analytics';
import { formatMoney } from '../api/format';
import { getOrderByOrderNumber } from '../api/orders';
import { recommendProducts } from '../api/products';
import type { ProductCard } from '../api/types';

type ConfirmationPageProps = {
  onContinueShopping?: () => void;
  onTrackOrder?: () => void;
  onOpenProduct?: (productId: string) => void;
};

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onContinueShopping, onTrackOrder, onOpenProduct }) => {
  const location = useLocation();
  const [orderNumber, setOrderNumber] = React.useState<string>('');
  const [totalLabel, setTotalLabel] = React.useState<string>('$0');
  const [suggestions, setSuggestions] = React.useState<ProductCard[]>([]);

  React.useEffect(() => {
    trackEvent('view_upsell', { placement: 'confirmation', section: 'complete_your_set' });
    const params = new URLSearchParams(location.search);
    const order = params.get('order') ?? window.localStorage.getItem('latest_order_number') ?? '';
    if (order) setOrderNumber(order);

    void (async () => {
      if (order) {
        const summary = await getOrderByOrderNumber(order);
        if (summary) setTotalLabel(formatMoney(summary.totalCents, summary.currency));
      }
      const picks = await recommendProducts({ query: 'complete set wedding', limit: 3 });
      setSuggestions(picks);
    })();
  }, [location.search]);

  return (
    <div className="bg-[#F6F1E8] text-[#1C1C1C] min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0E4F3C]/10 mb-6">
            <CheckCircle2 className="text-[#0E4F3C]" size={40} />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-normal mb-4">Thank you for your order.</h2>
          <p className="text-[#6F6F6F] max-w-lg mx-auto leading-relaxed">
            Your jewelry is being prepared with care by our master artisans.
          </p>
          <div className="mt-8 inline-block px-6 py-2 border border-[rgba(198,167,94,0.2)] bg-[#EFE7DA] rounded">
            <span className="text-xs uppercase tracking-[0.2em] text-[#6F6F6F] block mb-1">Order Number</span>
            <span className="text-xl font-semibold text-[#0E4F3C]">#{orderNumber || 'ELX-PENDING'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="font-serif text-xl border-b border-[rgba(198,167,94,0.2)] pb-4 mb-6">Order Summary</h3>
              <p className="text-sm text-[#4D4D4D]">Your order has been placed successfully and is now pending manual payment verification.</p>
            </section>
          </div>

          <div className="md:col-span-1 space-y-8">
            <div className="bg-[#EFE7DA] p-8 rounded-sm border border-[rgba(198,167,94,0.2)]">
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#0E4F3C] mb-4">Shipping Method</h4>
                <div className="flex items-start gap-3">
                  <Truck className="text-[#0E4F3C]" size={18} />
                  <div>
                    <p className="text-sm font-semibold">Complimentary Standard</p>
                    <p className="text-xs text-[#6F6F6F] mt-1">Est. Arrival: 3-5 business days</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#0E4F3C] mb-4">Payment</h4>
                <div className="flex items-start gap-3">
                  <CreditCard className="text-[#0E4F3C]" size={18} />
                  <div>
                    <p className="text-sm font-semibold">Pending Manual Confirmation</p>
                    <p className="text-xs text-[#6F6F6F] mt-1">Our team will confirm shortly.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(198,167,94,0.15)] flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-[0.2em]">Total</span>
                <span className="text-2xl font-light">{totalLabel}</span>
              </div>
            </div>

            <div className="p-6 border border-[rgba(198,167,94,0.2)] rounded-sm bg-white">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#0E4F3C] mb-3">Concierge Support</h4>
              <p className="text-xs text-[#6F6F6F] mb-4 leading-relaxed">Our specialists are available 24/7 for order tracking and styling guidance.</p>
              <div className="space-y-3">
                <a className="flex items-center gap-2 text-xs font-medium hover:text-[#0E4F3C] transition-colors" href="#">
                  <Mail size={14} />
                  concierge@eluxee.com
                </a>
                <a className="flex items-center gap-2 text-xs font-medium hover:text-[#0E4F3C] transition-colors" href="#">
                  <Phone size={14} />
                  1-800-ELUXEE
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12 bg-[#EFE7DA] border border-[rgba(198,167,94,0.2)] p-6">
          <h3 className="font-serif text-2xl">Complete Your Set</h3>
          <p className="mt-2 text-sm text-[#6F6F6F]">Curated picks based on your purchase profile.</p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestions.map((item) => (
              <article key={item.id} className="bg-white border border-[rgba(198,167,94,0.15)] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F]">Post-Purchase Pick</p>
                <p className="mt-1 font-medium">{item.name}</p>
                <p className="text-[#0E4F3C] font-semibold">{item.priceLabel}</p>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('click_upsell', { placement: 'confirmation', section: 'complete_your_set', product_id: item.id });
                    onOpenProduct?.(item.id);
                  }}
                  className="mt-3 text-xs uppercase tracking-widest text-[#0E4F3C] font-semibold hover:text-[#B8954C]"
                >
                  View
                </button>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6 pt-12 border-t border-[rgba(198,167,94,0.2)]">
          <button
            onClick={() => {
              trackEvent('click_upsell', { placement: 'confirmation', action: 'continue_shopping' });
              onContinueShopping?.();
            }}
            className="bg-[#0A3F30] text-[#F6F1E8] px-12 py-4 rounded uppercase tracking-widest text-xs font-bold hover:bg-[#115A46] transition-all w-full md:w-auto"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              trackEvent('click_upsell', { placement: 'confirmation', action: 'track_order' });
              onTrackOrder?.();
            }}
            className="border border-[#C6A75E] text-[#C6A75E] px-12 py-4 rounded uppercase tracking-widest text-xs font-bold hover:bg-[#C6A75E] hover:text-[#1C1C1C] transition-all w-full md:w-auto"
          >
            Track Your Order
          </button>
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 text-xs text-[#6F6F6F] hover:text-[#0E4F3C] uppercase tracking-widest transition-colors">
            <Printer size={14} />
            Download Invoice PDF
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;
