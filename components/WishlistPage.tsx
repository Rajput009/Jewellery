import React from 'react';
import { X, Share2, Inbox } from 'lucide-react';
import { addCartItem } from '../api/cart';
import { getWishlistItems, removeWishlistItem } from '../api/wishlist';
import { recommendProducts } from '../api/products';
import type { ProductCard, WishlistItemView } from '../api/types';

const WishlistPage: React.FC = () => {
  const [items, setItems] = React.useState<WishlistItemView[]>([]);
  const [suggestions, setSuggestions] = React.useState<ProductCard[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const wishlist = await getWishlistItems();
      setItems(wishlist);
      const picks = await recommendProducts({ query: wishlist.map((item) => item.name).join(' ') || 'jewelry', limit: 4 });
      setSuggestions(picks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load wishlist.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div className="bg-[#F6F1E8] text-[#1C1C1C]">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-[#0E4F3C] mb-4 italic">Your Wishlist</h2>
          <p className="text-[#6F6F6F] uppercase tracking-[0.3em] text-sm">{items.length} Exquisite Pieces Curated By You</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-[rgba(198,167,94,0.2)] pb-8 mb-12 gap-6">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-medium hover:text-[#0E4F3C] transition-all group">
              <Share2 size={18} className="group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-widest">Share Wishlist</span>
            </button>
            <div className="h-4 w-px bg-[rgba(198,167,94,0.2)] hidden sm:block" />
            <p className="text-sm text-[#6F6F6F] italic">Items saved for your next occasion</p>
          </div>
          <button className="px-8 py-3 border border-[#C6A75E] text-[#C6A75E] hover:bg-[#C6A75E] hover:text-[#1C1C1C] transition-all duration-300 text-sm font-bold uppercase tracking-widest flex items-center gap-3">
            <Inbox size={18} />
            Move All to Bag
          </button>
        </div>

        {loading ? <p className="text-sm text-[#6F6F6F]">Loading wishlist...</p> : null}
        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {items.map((item) => (
            <article key={item.id} className="group relative flex flex-col">
              <div className="relative aspect-[4/5] bg-[#ECE6E7] overflow-hidden border border-[rgba(198,167,94,0.15)] group-hover:border-[rgba(198,167,94,0.35)] transition-colors">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button
                  className="absolute top-4 right-4 bg-[#F6F1E8]/85 backdrop-blur-sm p-1.5 hover:bg-[#0E4F3C] hover:text-[#F6F1E8] transition-colors"
                  onClick={async () => {
                    await removeWishlistItem(item.id);
                    await refresh();
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-6 text-center px-4">
                <h3 className="font-serif text-xl mb-1 group-hover:text-[#0E4F3C] transition-colors">{item.name}</h3>
                <p className="text-[#6F6F6F] text-sm mb-6 tracking-widest">{item.priceLabel}</p>
                <button
                  className="w-full bg-[#0A3F30] text-[#F6F1E8] py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#115A46] transition-all"
                  onClick={async () => {
                    await addCartItem(item.productId, 1);
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-[rgba(198,167,94,0.2)]">
          <h2 className="font-serif text-3xl mb-10 italic text-[#0E4F3C]">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {suggestions.map((item) => (
              <article key={item.id} className="group cursor-pointer">
                <div className="aspect-square bg-white overflow-hidden mb-4 border border-[rgba(198,167,94,0.15)] group-hover:border-[rgba(198,167,94,0.35)] transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-xs uppercase tracking-widest font-bold">{item.name}</p>
                <p className="text-xs text-[#6F6F6F]">{item.priceLabel}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WishlistPage;
