import React from 'react';
import { Heart, ShoppingBag, Search, SlidersHorizontal } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  collection: string;
  price: string;
  details: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: 'c1',
    name: 'Eternal Diamond Solitaire',
    collection: 'Bridal Collection',
    price: '$2,450',
    details: '18k Yellow Gold - 1.2 Carat',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'c2',
    name: 'Sapphire Halo Orbit',
    collection: 'Modern Muse',
    price: '$1,890',
    details: 'Platinum - Blue Sapphire',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'c3',
    name: 'Dainty Pave Stack Band',
    collection: 'Minimalist',
    price: '$1,200',
    details: '18k Rose Gold - Recycled Diamonds',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'c4',
    name: 'Vintage Emerald Cut',
    collection: 'Heritage',
    price: '$3,150',
    details: '18k Yellow Gold - Emerald Cut',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'c5',
    name: 'Grand Gatsby Signet',
    collection: 'Art Deco',
    price: '$2,780',
    details: '18k White Gold - Custom Intaglio',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'c6',
    name: 'Infinity Vine Band',
    collection: 'The Twist',
    price: '$950',
    details: '14k Yellow Gold - Conflict Free',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop',
  },
];

type CollectionsPageProps = {
  onViewProduct?: (productId: string) => void;
  onOpenSearch?: () => void;
};

const CollectionsPage: React.FC<CollectionsPageProps> = ({ onViewProduct, onOpenSearch }) => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg md:rounded-none m-4 md:m-0 p-4 md:p-8">
      <div className="rounded-lg overflow-hidden mb-8 md:mb-12">
        <div
          className="h-[240px] md:h-[340px] bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(10,63,48,0.85), rgba(10,63,48,0.12)), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="px-6 md:px-12 max-w-2xl text-[#F6F1E8]">
            <span className="text-xs md:text-sm uppercase tracking-[0.26em] text-[#E4DBCE]">Summer 2024</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-light leading-tight">
              The Radiant <span className="font-bold italic">Heritage</span> Collection
            </h2>
            <p className="mt-4 md:mt-6 text-[#E4DBCE] text-sm md:text-lg font-light leading-relaxed">
              Discover our curated selection of fine gold and diamond pieces, handcrafted to last generations.
            </p>
            <button className="mt-6 bg-[#C6A75E] text-[#1C1C1C] px-6 py-2.5 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#B8954C] transition-colors">
              Explore Story
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        <aside className="w-full lg:w-64 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E4F3C] mb-6 flex items-center justify-between">
              Filter By
              <SlidersHorizontal size={16} />
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-4 uppercase tracking-tight">Category</p>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-3"><input type="checkbox" className="rounded-sm accent-[#0E4F3C]" />All Jewelry</label>
                  <label className="flex items-center gap-3 text-[#0E4F3C] font-medium"><input type="checkbox" checked readOnly className="rounded-sm accent-[#0E4F3C]" />Rings</label>
                  <label className="flex items-center gap-3"><input type="checkbox" className="rounded-sm accent-[#0E4F3C]" />Necklaces</label>
                  <label className="flex items-center gap-3"><input type="checkbox" className="rounded-sm accent-[#0E4F3C]" />Earrings</label>
                </div>
              </div>

              <div className="pt-5 border-t border-[rgba(198,167,94,0.2)]">
                <p className="text-sm font-semibold mb-4 uppercase tracking-tight">Material</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button className="px-3 py-2 border border-[rgba(198,167,94,0.2)] hover:border-[#C6A75E] transition-colors">18k Gold</button>
                  <button className="px-3 py-2 border border-[rgba(198,167,94,0.2)] hover:border-[#C6A75E] transition-colors">Platinum</button>
                  <button className="px-3 py-2 border border-[#C6A75E] bg-[#EFE7DA]">Rose Gold</button>
                  <button className="px-3 py-2 border border-[rgba(198,167,94,0.2)] hover:border-[#C6A75E] transition-colors">Silver</button>
                </div>
              </div>

              <div className="pt-5 border-t border-[rgba(198,167,94,0.2)]">
                <p className="text-sm font-semibold mb-4 uppercase tracking-tight">Search</p>
                <div className="flex items-center border border-[rgba(198,167,94,0.2)] px-3 py-2 bg-white">
                  <Search size={16} className="text-[#0E4F3C]/70" />
                  <input className="ml-2 bg-transparent w-full text-sm outline-none" placeholder="Search collection..." />
                  <button
                    type="button"
                    onClick={onOpenSearch}
                    className="text-[10px] uppercase tracking-widest font-semibold text-[#0E4F3C] hover:text-[#B8954C] transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-light tracking-tight">
              Fine Rings <span className="text-base text-[#6F6F6F]">(42 items)</span>
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">Sort By</span>
              <select className="bg-transparent text-[#0E4F3C] font-medium outline-none">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="group cursor-pointer"
                onClick={() => onViewProduct?.(product.id)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0f0] rounded-sm mb-4 border border-[rgba(198,167,94,0.15)] group-hover:border-[rgba(198,167,94,0.35)] group-hover:shadow-[0_8px_20px_rgba(10,63,48,0.08)] transition-all">
                  {product.id === 'c1' || product.id === 'c2' ? (
                    <span className="absolute top-4 left-4 z-10 bg-[#0A3F30] text-[#F6F1E8] text-[10px] uppercase tracking-widest px-2 py-1">
                      Bestseller
                    </span>
                  ) : null}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button className="absolute top-4 right-4 text-[#F6F1E8] drop-shadow-md hover:text-[#C6A75E] transition-colors">
                    <Heart size={20} />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/92 backdrop-blur-sm py-3 text-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0E4F3C]">
                      <ShoppingBag size={14} />
                      Add to Bag
                    </span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6F6F6F] font-bold">{product.collection}</p>
                <h3 className="text-sm mt-1 font-medium group-hover:text-[#0E4F3C] transition-colors">{product.name}</h3>
                <p className="text-sm mt-1 font-bold text-[#1C1C1C] tracking-tight">{product.price}</p>
                <p className="text-[10px] mt-1 text-[#6F6F6F] font-medium">{product.details}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center border-t border-[rgba(198,167,94,0.2)] pt-10">
            <p className="text-sm text-[#6F6F6F] mb-5">Showing 6 of 42 jewelry pieces</p>
            <div className="w-64 h-1 bg-[rgba(198,167,94,0.2)] rounded-full mb-8">
              <div className="w-1/4 h-full bg-[#0E4F3C] rounded-full" />
            </div>
            <button className="border border-[#C6A75E] text-[#C6A75E] px-10 py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#C6A75E] hover:text-[#1C1C1C] transition-colors">
              Load More Pieces
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default CollectionsPage;
