import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { trackEvent } from '../services/analytics';

type ProductDetailPageProps = {
  onBackToCollections?: () => void;
  onAddToBag?: () => void;
  onOpenProduct?: (productId: string) => void;
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onBackToCollections, onAddToBag, onOpenProduct }) => {
  React.useEffect(() => {
    trackEvent('view_upsell', { placement: 'product_detail', section: 'you_may_also_like' });
    trackEvent('view_upsell', { placement: 'product_detail', section: 'complete_the_look' });
    trackEvent('view_upsell', { placement: 'product_detail', section: 'premium_upgrade_option' });
  }, []);

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <button
        type="button"
        onClick={onBackToCollections}
        className="inline-flex items-center gap-2 text-sm text-[#0E4F3C] hover:text-[#B8954C] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Collections
      </button>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] rounded-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop"
            alt="Eternal Diamond Solitaire Ring"
            className="w-full h-full object-cover min-h-[340px]"
          />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#0E4F3C] font-semibold">Bridal Collection</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">287 shoppers added this in the last 7 days</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-light leading-tight text-[#1C1C1C]">
            Eternal Diamond Solitaire
          </h1>
          <p className="mt-4 text-2xl font-semibold">$2,450</p>
          <p className="mt-1 text-xs text-[#6F6F6F] line-through">$2,900 retail value</p>

          <p className="mt-6 text-sm leading-relaxed text-[#4D4D4D]">
            A timeless round-cut solitaire set in 18k yellow gold. Designed for bold elegance with a refined, everyday silhouette.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs uppercase tracking-wider">
            <div className="border border-[rgba(198,167,94,0.22)] bg-white p-3">18k Yellow Gold</div>
            <div className="border border-[rgba(198,167,94,0.22)] bg-white p-3">1.2 Carat</div>
            <div className="border border-[rgba(198,167,94,0.22)] bg-white p-3">Ring Size 6</div>
            <div className="border border-[rgba(198,167,94,0.22)] bg-white p-3">Conflict-Free</div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('click_upsell', { placement: 'product_detail', action: 'add_to_bag_primary' });
                onAddToBag?.();
              }}
              className="px-7 py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
            >
              Add to Bag
            </button>
            <button
              type="button"
              className="px-7 py-3 border border-[rgba(198,167,94,0.5)] text-[#0E4F3C] text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#EFE7DA] transition-colors"
            >
              Save to Wishlist
            </button>
          </div>
          <p className="mt-3 text-xs text-[#4D4D4D] uppercase tracking-wider">Only 5 pieces left in this finish</p>

          <div className="mt-8 space-y-3 text-sm text-[#4D4D4D]">
            <p className="inline-flex items-center gap-2"><Truck size={16} className="text-[#0E4F3C]" /> Complimentary delivery in 3-5 business days</p>
            <p className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-[#0E4F3C]" /> Authenticity and lifetime maintenance included</p>
            <p className="inline-flex items-center gap-2"><Sparkles size={16} className="text-[#0E4F3C]" /> Personal engraving available at checkout</p>
          </div>
          <div className="mt-6 p-4 bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] text-sm text-[#4D4D4D]">
            30-day easy returns and size exchange.
            <span className="font-semibold text-[#1C1C1C]"> Try risk-free.</span>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-light">You May Also Like</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'c2', name: 'Emerald Halo Ring', price: '$2,980', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=600&auto=format&fit=crop' },
            { id: 'c3', name: 'Verde Signet Ring', price: '$3,220', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop' },
            { id: 'c4', name: 'Ivory Solitaire Ring', price: '$2,150', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop' },
          ].map((item) => (
            <article key={item.name} className="bg-white border border-[rgba(198,167,94,0.18)] p-3">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <p className="mt-3 text-sm font-medium">{item.name}</p>
              <p className="text-sm text-[#0E4F3C] font-semibold">{item.price}</p>
              <button
                type="button"
                onClick={() => {
                  trackEvent('click_upsell', { placement: 'product_detail', section: 'you_may_also_like', product_id: item.id });
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

      <section className="mt-10 bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-5 md:p-6">
        <h2 className="text-2xl font-light">Complete the Look</h2>
        <p className="mt-2 text-sm text-[#4D4D4D]">Curated pieces from the same emerald-gold line.</p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'c5', name: 'Emerald Drop Earrings', price: '$1,240' },
            { id: 'c6', name: 'Emerald Pendant Necklace', price: '$1,680' },
            { id: 'c1', name: 'Slim Emerald Bracelet', price: '$980' },
          ].map((item) => (
            <article key={item.name} className="bg-white border border-[rgba(198,167,94,0.18)] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F]">Matched Set</p>
              <p className="mt-1 font-medium">{item.name}</p>
              <p className="text-[#0E4F3C] font-semibold">{item.price}</p>
              <button
                type="button"
                onClick={() => {
                  trackEvent('click_upsell', { placement: 'product_detail', section: 'complete_the_look', product_id: item.id });
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

      <section className="mt-8 bg-white border border-[rgba(198,167,94,0.22)] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F]">Premium Upgrade Option</p>
          <h3 className="mt-1 text-xl font-medium">2.0 Carat Signature Emerald Cut</h3>
          <p className="mt-1 text-sm text-[#4D4D4D]">Higher clarity stone with atelier finishing and priority certification.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            trackEvent('click_upsell', { placement: 'product_detail', section: 'premium_upgrade_option', product_id: 'upgrade-emerald-cut' });
            onOpenProduct?.('upgrade-emerald-cut');
          }}
          className="px-6 py-3 bg-[#0A3F30] text-[#F6F1E8] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#115A46] transition-colors"
        >
          View Upgrade
        </button>
      </section>
    </section>
  );
};

export default ProductDetailPage;
