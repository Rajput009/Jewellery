import React from 'react';
import {
  ChevronRight,
  Contact,
  CreditCard,
  Lock,
  Plus,
  ShieldCheck,
  Headset,
} from 'lucide-react';
import { trackEvent } from '../services/analytics';

type CheckoutPageProps = {
  onCompletePurchase?: () => void;
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onCompletePurchase }) => {
  React.useEffect(() => {
    trackEvent('view_upsell', { placement: 'checkout', section: 'checkout_addons' });
  }, []);

  return (
    <div className="bg-[#F6F1E8] text-[#1C1C1C] min-h-screen">
      <main className="flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-6 md:px-20 py-12 gap-12 lg:gap-16">
        <div className="flex-1 space-y-10 md:space-y-12">
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C]/60 font-semibold">
            <span>Bag</span>
            <ChevronRight size={12} />
            <span className="text-[#0E4F3C] font-bold">Checkout</span>
            <ChevronRight size={12} />
            <span className="opacity-40">Confirmation</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-light tracking-tight">Secure Checkout</h1>
          <div className="h-1.5 w-full max-w-md bg-[rgba(198,167,94,0.2)] rounded-full">
            <div className="h-full w-2/3 bg-[#0E4F3C] rounded-full" />
          </div>

          <section className="pb-10 border-b border-[rgba(198,167,94,0.2)]">
            <p className="text-[10px] uppercase tracking-widest text-center mb-6 text-[#0E4F3C]/60">Express Checkout</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center h-14 border border-[rgba(198,167,94,0.2)] hover:border-[#C6A75E] hover:bg-[#EFE7DA] transition-colors rounded-sm">
                <Contact size={18} className="mr-2" />
                <span className="font-bold">Apple Pay</span>
              </button>
              <button className="flex items-center justify-center h-14 border border-[rgba(198,167,94,0.2)] hover:border-[#C6A75E] hover:bg-[#EFE7DA] transition-colors rounded-sm">
                <CreditCard size={18} className="mr-2" />
                <span className="font-bold">PayPal</span>
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium tracking-tight">1. Contact Information</h2>
              <button className="text-xs uppercase tracking-widest text-[#0E4F3C] font-bold underline underline-offset-4">Log In</button>
            </div>
            <div className="flex flex-col">
              <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">Email Address</label>
              <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none placeholder:text-[#0E4F3C]/30" placeholder="email@example.com" type="email" />
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input className="rounded-sm border-[rgba(198,167,94,0.2)] text-[#0E4F3C] focus:ring-[#0E4F3C] h-4 w-4" type="checkbox" />
                <span className="text-sm text-[#0E4F3C]/70">Keep me updated with exclusive news and offers</span>
              </label>
            </div>
          </section>

          <section className="space-y-6 pt-6 border-t border-[rgba(198,167,94,0.2)]">
            <h2 className="text-xl font-medium tracking-tight">2. Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">First Name</label>
                <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">Last Name</label>
                <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">Address</label>
                <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" placeholder="House number and street name" />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">City</label>
                <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">Postal Code</label>
                <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" />
              </div>
            </div>
          </section>

          <section className="space-y-6 pt-6 border-t border-[rgba(198,167,94,0.2)]">
            <h2 className="text-xl font-medium tracking-tight">3. Shipping Method</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-5 border border-[rgba(198,167,94,0.2)] rounded-sm bg-white cursor-pointer ring-1 ring-[rgba(198,167,94,0.2)]">
                <div className="flex items-center gap-4">
                  <input checked readOnly className="text-[#0E4F3C] focus:ring-[#0E4F3C]" name="shipping" type="radio" />
                  <div>
                    <p className="font-bold text-sm">Complimentary Standard Delivery <span className="text-[10px] uppercase tracking-wider text-[#0E4F3C]">Recommended</span></p>
                    <p className="text-xs text-[#0E4F3C]/60">3-5 business days</p>
                  </div>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">Free</span>
              </label>
              <label className="flex items-center justify-between p-5 border border-[rgba(198,167,94,0.2)] rounded-sm bg-white cursor-pointer hover:border-[#C6A75E] transition-colors">
                <div className="flex items-center gap-4">
                  <input className="text-[#0E4F3C] focus:ring-[#0E4F3C]" name="shipping" type="radio" />
                  <div>
                    <p className="font-bold text-sm">White Glove Express</p>
                    <p className="text-xs text-[#0E4F3C]/60">Next business day delivery</p>
                  </div>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">$45.00</span>
              </label>
            </div>
          </section>

          <section className="space-y-6 pt-6 border-t border-[rgba(198,167,94,0.2)]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium tracking-tight">4. Payment Information</h2>
              <div className="flex gap-2 items-center">
                <Lock size={16} className="text-[#0E4F3C]/40" />
                <span className="text-[10px] uppercase tracking-widest text-[#0E4F3C]/60 font-bold">Secure SSL Encryption</span>
              </div>
            </div>
            <div className="bg-[#EFE7DA] p-6 md:p-8 rounded-sm space-y-6 border border-[rgba(198,167,94,0.2)]">
              <div className="flex flex-col">
                <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">Card Number</label>
                <div className="relative">
                  <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" placeholder="0000 0000 0000 0000" />
                  <CreditCard size={18} className="absolute right-4 top-4 text-[#0E4F3C]/40" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">Expiry Date</label>
                  <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" placeholder="MM / YY" />
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] uppercase tracking-widest font-semibold pb-2 text-[#0E4F3C]/70">CVV</label>
                  <input className="h-14 bg-white border border-[rgba(198,167,94,0.2)] rounded-sm px-4 focus:ring-0 focus:border-[#0E4F3C] w-full outline-none" placeholder="123" />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                trackEvent('click_upsell', { placement: 'checkout', action: 'complete_purchase' });
                onCompletePurchase?.();
              }}
              className="w-full h-16 bg-[#C6A75E] text-[#1C1C1C] font-bold uppercase tracking-[0.28em] hover:bg-[#B8954C] transition-colors rounded-sm"
            >
              Complete Purchase
            </button>
            <p className="text-xs text-center text-[#0E4F3C]">You are saving $45.00 with complimentary delivery today.</p>
            <p className="text-[10px] text-center text-[#0E4F3C]/50 uppercase tracking-widest">
              By clicking "Complete Purchase", you agree to our Terms of Sale and Privacy Policy.
            </p>
          </section>
        </div>

        <aside className="w-full lg:w-[400px]">
          <div className="lg:sticky lg:top-12 space-y-8 bg-white p-8 border border-[rgba(198,167,94,0.15)]">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-[rgba(198,167,94,0.15)] pb-4">Order Summary (2)</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="size-20 bg-[#F6F1E8] border border-[rgba(198,167,94,0.15)] overflow-hidden">
                  <img alt="Eternity Diamond Band" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=500&auto=format&fit=crop" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-sm font-bold">Eternity Diamond Band</h4>
                    <p className="text-[10px] uppercase tracking-wider text-[#0E4F3C]/60">18k Yellow Gold / Size 6</p>
                  </div>
                  <p className="text-sm font-medium">$2,850.00</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-20 bg-[#F6F1E8] border border-[rgba(198,167,94,0.15)] overflow-hidden">
                  <img alt="Lumina Rose Bracelet" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-sm font-bold">Lumina Rose Bracelet</h4>
                    <p className="text-[10px] uppercase tracking-wider text-[#0E4F3C]/60">Rose Gold / Medium</p>
                  </div>
                  <p className="text-sm font-medium">$1,420.00</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(198,167,94,0.15)] space-y-3">
              <div className="flex justify-between text-sm"><span className="text-[#6F6F6F]">Subtotal</span><span>$4,270.00</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6F6F6F]">Shipping</span><span className="text-[#0E4F3C]">Complimentary</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6F6F6F]">Estimated Tax</span><span>$341.60</span></div>
            </div>

            <button className="text-[10px] uppercase tracking-widest font-bold text-[#C6A75E] flex items-center gap-1 hover:text-[#B8954C] transition-colors">
              <Plus size={14} /> Add Promotion Code
            </button>

            <div className="pt-6 border-t border-[rgba(198,167,94,0.15)] flex justify-between items-end">
              <span className="text-sm font-bold uppercase tracking-[0.2em]">Total</span>
              <span className="text-2xl font-light">$4,611.60</span>
            </div>

            <div className="pt-5 border-t border-[rgba(198,167,94,0.15)] space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0E4F3C]">Checkout Add-Ons</p>
              <label className="flex items-center justify-between text-xs text-[#4D4D4D]">
                <span className="inline-flex items-center gap-2"><input type="checkbox" className="accent-[#0E4F3C]" onChange={(event) => trackEvent('accept_addon', { placement: 'checkout', addon: 'shipping_insurance', accepted: event.currentTarget.checked })} /> Shipping Insurance</span>
                <span>+$18</span>
              </label>
              <label className="flex items-center justify-between text-xs text-[#4D4D4D]">
                <span className="inline-flex items-center gap-2"><input type="checkbox" className="accent-[#0E4F3C]" onChange={(event) => trackEvent('accept_addon', { placement: 'checkout', addon: 'gift_wrap', accepted: event.currentTarget.checked })} /> Gift Wrap</span>
                <span>+$12</span>
              </label>
              <label className="flex items-center justify-between text-xs text-[#4D4D4D]">
                <span className="inline-flex items-center gap-2"><input type="checkbox" className="accent-[#0E4F3C]" onChange={(event) => trackEvent('accept_addon', { placement: 'checkout', addon: 'priority_dispatch', accepted: event.currentTarget.checked })} /> Priority Dispatch</span>
                <span>+$25</span>
              </label>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-3 border border-[rgba(198,167,94,0.15)] rounded-sm">
                <ShieldCheck size={18} className="text-[#0E4F3C]/40 mb-2" />
                <span className="text-[9px] uppercase tracking-tight leading-tight font-bold text-[#0E4F3C]/70">Authenticity Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 border border-[rgba(198,167,94,0.15)] rounded-sm">
                <Headset size={18} className="text-[#0E4F3C]/40 mb-2" />
                <span className="text-[9px] uppercase tracking-tight leading-tight font-bold text-[#0E4F3C]/70">Luxury Concierge 24/7</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="mt-auto px-6 md:px-20 py-10 border-t border-[rgba(198,167,94,0.15)] bg-[#0A3F30]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#E4DBCE] font-bold">© 2024 Eluxee Jewelry. All Rights Reserved.</p>
          <div className="flex gap-8">
            <button className="text-[10px] uppercase tracking-[0.2em] text-[#F6F1E8] hover:text-[#C6A75E] font-bold transition-colors">Shipping & Returns</button>
            <button className="text-[10px] uppercase tracking-[0.2em] text-[#F6F1E8] hover:text-[#C6A75E] font-bold transition-colors">Privacy Policy</button>
            <button className="text-[10px] uppercase tracking-[0.2em] text-[#F6F1E8] hover:text-[#C6A75E] font-bold transition-colors">Contact Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
