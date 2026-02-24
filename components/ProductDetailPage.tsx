import React from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Heart, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { trackEvent } from '../services/analytics';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addCartItem } from '../api/cart';
import { getProductByPublicIdOrSlug, recommendProducts } from '../api/products';
import type { ProductCard, ProductDetail } from '../api/types';
import { addWishlistItem } from '../api/wishlist';
import { getCurrentUser } from '../api/auth';

type ProductDetailPageProps = {
  onBackToCollections?: () => void;
  onAddToBag?: () => void;
  onOpenProduct?: (productId: string) => void;
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onBackToCollections, onAddToBag, onOpenProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId = 'c4' } = useParams();
  const [product, setProduct] = React.useState<ProductDetail | null>(null);
  const [recommended, setRecommended] = React.useState<ProductCard[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    trackEvent('view_upsell', { placement: 'product_detail', section: 'you_may_also_like' });
  }, []);

  React.useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductByPublicIdOrSlug(productId);
        setProduct(productData);
        const picks = await recommendProducts({ query: productData?.name ?? 'ring', limit: 4 });
        setRecommended(picks.filter((item) => item.id !== productData?.id).slice(0, 4));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load product');
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [productId]);

  const redirectToLogin = React.useCallback(() => {
    const next = `${location.pathname}${location.search}`;
    navigate(`/login?redirect=${encodeURIComponent(next)}`);
  }, [location.pathname, location.search, navigate]);

  const current = product ?? {
    id: 'unknown',
    slug: 'unknown',
    name: 'Product',
    collection: 'Collection',
    priceLabel: '$0',
    description: '',
    metal: 'N/A',
    gemstone: 'N/A',
    images: [{ url: '', alt: 'Product image' }],
    variants: [],
  };

  const mainImage = current.images[0]?.url ?? '';
  const sideImageA = current.images[1]?.url ?? current.images[0]?.url ?? '';
  const sideImageB = current.images[2]?.url ?? current.images[0]?.url ?? '';

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] m-4 md:m-0 px-5 md:px-10 py-8 md:py-10">
      <button
        type="button"
        onClick={onBackToCollections}
        className="inline-flex items-center gap-2 text-sm text-[#0E4F3C] hover:text-[#B8954C] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Collections
      </button>

      <nav className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#0E4F3C]/70">
        <button type="button" onClick={onBackToCollections} className="hover:text-[#0E4F3C]">
          Home
        </button>
        <ChevronRight size={12} />
        <button type="button" onClick={onBackToCollections} className="hover:text-[#0E4F3C]">
          Fine Jewelry
        </button>
        <ChevronRight size={12} />
        <button type="button" onClick={onBackToCollections} className="hover:text-[#0E4F3C]">
          Rings
        </button>
        <ChevronRight size={12} />
        <span className="text-[#0E4F3C] font-semibold">{current.name}</span>
      </nav>

      {loading ? <p className="mt-6 text-sm text-[#6F6F6F]">Loading product...</p> : null}
      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-white border border-[rgba(198,167,94,0.18)] overflow-hidden">
              <img
                src={mainImage}
                alt={current.images[0]?.alt ?? current.name}
                className="w-full h-[460px] md:h-[580px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="bg-white border border-[rgba(198,167,94,0.18)] overflow-hidden h-64 md:h-72">
              <img
                src={sideImageA}
                alt="Emerald gemstone detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white border border-[rgba(198,167,94,0.18)] overflow-hidden h-64 md:h-72">
              <img
                src={sideImageB}
                alt="Lifestyle hand shot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0E4F3C]/70 font-semibold">{current.collection}</p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl leading-tight">{current.name}</h1>
            <p className="mt-3 text-3xl font-light text-[#0E4F3C]">{current.priceLabel}</p>
          </div>

          <p className="text-[#4D4D4D] leading-relaxed text-sm md:text-base">
            {current.description}
          </p>

          <div className="space-y-6 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest mb-3">
                <span>Select Size</span>
                <button type="button" className="underline text-[#0E4F3C]/70 hover:text-[#0E4F3C]">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <button className="border border-[#0E4F3C] bg-[#0E4F3C] text-[#F6F1E8] py-3 text-xs font-bold">5</button>
                <button className="border border-[rgba(198,167,94,0.25)] py-3 text-xs hover:border-[#C6A75E]">6</button>
                <button className="border border-[rgba(198,167,94,0.25)] py-3 text-xs hover:border-[#C6A75E]">7</button>
                <button className="border border-[rgba(198,167,94,0.25)] py-3 text-xs hover:border-[#C6A75E]">8</button>
                <button className="border border-[rgba(198,167,94,0.25)] py-3 text-xs hover:border-[#C6A75E]">9</button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">Complimentary Engraving</label>
              <input
                type="text"
                placeholder="Up to 15 characters"
                className="w-full bg-white border border-[rgba(198,167,94,0.25)] px-4 py-3 text-sm outline-none focus:border-[#C6A75E]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={async () => {
                try {
                  await addCartItem(current.id, 1);
                  onAddToBag?.();
                } catch {
                  // Keep UI responsive even if cart sync fails.
                }
              }}
              className="w-full bg-[#0A3F30] text-[#F6F1E8] py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#115A46] transition-colors inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              Add to Bag
            </button>
            <button
              type="button"
              className="w-full border border-[rgba(198,167,94,0.35)] text-[#0E4F3C] py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#EFE7DA]"
            >
              Book a Private Viewing
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-[11px] uppercase tracking-wide font-semibold">
            <p className="inline-flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#0E4F3C]" />
              In Stock & Ready to Ship
            </p>
            <p className="inline-flex items-center gap-2">
              <Truck size={15} className="text-[#0E4F3C]" />
              Free Insured Delivery
            </p>
          </div>

          <div className="border-t border-[rgba(198,167,94,0.2)] pt-5 space-y-3">
            <details className="border-b border-[rgba(198,167,94,0.2)] pb-4" open>
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-serif text-lg">Product Details</span>
                <span className="text-[#0E4F3C]">+</span>
              </summary>
              <div className="mt-4 text-sm text-[#4D4D4D] space-y-2">
                <p className="flex justify-between"><span className="font-semibold">Material</span><span>{current.metal}</span></p>
                <p className="flex justify-between"><span className="font-semibold">Gemstone</span><span>{current.gemstone}</span></p>
                <p className="flex justify-between"><span className="font-semibold">Cut</span><span>{current.gemstone?.includes('Emerald') ? 'Emerald Cut' : 'Premium Cut'}</span></p>
                <p className="flex justify-between"><span className="font-semibold">Origin</span><span>Handcrafted in Italy</span></p>
              </div>
            </details>
            <details className="border-b border-[rgba(198,167,94,0.2)] pb-4">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-serif text-lg">Shipping & Returns</span>
                <span className="text-[#0E4F3C]">+</span>
              </summary>
              <p className="mt-4 text-sm text-[#4D4D4D] leading-relaxed">
                Complimentary worldwide shipping in signature packaging. Returns accepted within 30 days for exchange or refund.
              </p>
            </details>
          </div>
        </aside>
      </div>

      <section className="mt-20 border-t border-[rgba(198,167,94,0.2)] pt-14 pb-10">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-3xl md:text-4xl">You May Also Like</h2>
          <button type="button" onClick={onBackToCollections} className="text-xs uppercase tracking-widest font-bold border-b border-[#0E4F3C] pb-1">
            View Collection
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((item) => (
            <article key={item.id} className="group cursor-pointer" onClick={() => onOpenProduct?.(item.id)}>
              <div className="aspect-square bg-white border border-[rgba(198,167,94,0.18)] overflow-hidden mb-4 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button
                  type="button"
                  className="absolute top-3 right-3 bg-[#F6F1E8]/90 p-1.5 rounded-full text-[#0E4F3C] opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(event) => {
                    event.stopPropagation();
                    void (async () => {
                      try {
                        const user = await getCurrentUser();
                        if (!user) {
                          redirectToLogin();
                          return;
                        }
                        await addWishlistItem(item.id);
                      } catch {
                        redirectToLogin();
                      }
                    })();
                  }}
                >
                  <Heart size={14} />
                </button>
              </div>
              <h3 className="font-serif text-lg">{item.name}</h3>
              <p className="text-sm text-[#0E4F3C]/80 font-medium">{item.priceLabel}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-4 bg-white border border-[rgba(198,167,94,0.2)] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
          className="px-6 py-3 bg-[#0A3F30] text-[#F6F1E8] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#115A46] transition-colors inline-flex items-center gap-2"
        >
          <Sparkles size={14} />
          View Upgrade
        </button>
      </section>
    </section>
  );
};

export default ProductDetailPage;
