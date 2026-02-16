import React from 'react';
import {
  CheckCircle2,
  Truck,
  CreditCard,
  Mail,
  Phone,
  Printer,
} from 'lucide-react';
import { trackEvent } from '../services/analytics';

type ConfirmationPageProps = {
  onContinueShopping?: () => void;
  onTrackOrder?: () => void;
  onOpenProduct?: (productId: string) => void;
};

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onContinueShopping, onTrackOrder, onOpenProduct }) => {
  React.useEffect(() => {
    trackEvent('view_upsell', { placement: 'confirmation', section: 'complete_your_set' });
  }, []);

  return (
    <div className="bg-[#F6F1E8] text-[#1C1C1C] min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0E4F3C]/10 mb-6">
            <CheckCircle2 className="text-[#0E4F3C]" size={40} />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-normal mb-4">Thank you for your order, Isabella.</h2>
          <p className="text-[#6F6F6F] max-w-lg mx-auto leading-relaxed">
            Your jewelry is being prepared with care by our master artisans.
            A confirmation email has been sent to <span className="text-[#0E4F3C] font-medium">isabella.v@example.com</span>.
          </p>
          <div className="mt-8 inline-block px-6 py-2 border border-[rgba(198,167,94,0.2)] bg-[#EFE7DA] rounded">
            <span className="text-xs uppercase tracking-[0.2em] text-[#6F6F6F] block mb-1">Order Number</span>
            <span className="text-xl font-semibold text-[#0E4F3C]">#ELX-92841</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="font-serif text-xl border-b border-[rgba(198,167,94,0.2)] pb-4 mb-6">Order Summary</h3>
              <div className="space-y-6">
                <div className="flex gap-6 group">
                  <div className="w-24 h-24 bg-[#EFE7DA] flex-shrink-0 overflow-hidden rounded-sm border border-[rgba(198,167,94,0.15)]">
                    <img className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=700&auto=format&fit=crop" alt="Vintage Emerald Cut Ring" />
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium uppercase tracking-tight">Vintage Emerald Cut Ring</h4>
                      <span className="text-[#0E4F3C] font-semibold">$12,400.00</span>
                    </div>
                    <p className="text-sm text-[#6F6F6F] mt-1">18k Yellow Gold / 2.5 Carat / Size 6</p>
                    <p className="text-xs text-[#6F6F6F] mt-2 italic">Custom engraving: "Forever & Always"</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-24 h-24 bg-[#EFE7DA] flex-shrink-0 overflow-hidden rounded-sm border border-[rgba(198,167,94,0.15)]">
                    <img className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=700&auto=format&fit=crop" alt="Pave Diamond Eternity Band" />
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium uppercase tracking-tight">Pave Diamond Eternity Band</h4>
                      <span className="text-[#0E4F3C] font-semibold">$4,850.00</span>
                    </div>
                    <p className="text-sm text-[#6F6F6F] mt-1">Platinum / F-G VS / Size 6</p>
                    <p className="text-xs text-[#6F6F6F] mt-2 italic">Standard Presentation Box</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="md:col-span-1 space-y-8">
            <div className="bg-[#EFE7DA] p-8 rounded-sm border border-[rgba(198,167,94,0.2)]">
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#0E4F3C] mb-4">Shipping Method</h4>
                <div className="flex items-start gap-3">
                  <Truck className="text-[#0E4F3C]" size={18} />
                  <div>
                    <p className="text-sm font-semibold">White Glove Express</p>
                    <p className="text-xs text-[#6F6F6F] mt-1">Est. Arrival: Oct 24, 2023</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#0E4F3C] mb-4">Payment</h4>
                <div className="flex items-start gap-3">
                  <CreditCard className="text-[#0E4F3C]" size={18} />
                  <div>
                    <p className="text-sm font-semibold">Mastercard ending in 8812</p>
                    <p className="text-xs text-[#6F6F6F] mt-1">Transaction: Approved</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border border-[rgba(198,167,94,0.2)] rounded-sm bg-white">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#0E4F3C] mb-3">Concierge Support</h4>
              <p className="text-xs text-[#6F6F6F] mb-4 leading-relaxed">Our specialists are available 24/7 to assist with your order tracking or styling needs.</p>
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
          <p className="mt-2 text-sm text-[#6F6F6F]">We will send a curated follow-up in 3 days with matching pieces from your collection.</p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'c5', name: 'Emerald Drop Earrings', price: '$1,240' },
              { id: 'c6', name: 'Emerald Pendant', price: '$1,680' },
              { id: 'c1', name: 'Slim Gold Bracelet', price: '$980' },
            ].map((item) => (
              <article key={item.name} className="bg-white border border-[rgba(198,167,94,0.15)] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F]">Post-Purchase Pick</p>
                <p className="mt-1 font-medium">{item.name}</p>
                <p className="text-[#0E4F3C] font-semibold">{item.price}</p>
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
