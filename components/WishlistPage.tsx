import React from 'react';
import { X, Share2, Inbox } from 'lucide-react';

type WishlistItem = {
  id: string;
  name: string;
  price: string;
  image: string;
};

const WISHLIST_ITEMS: WishlistItem[] = [
  { id: 'w1', name: 'Diamond Eternity Band', price: '$1,200', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=900&auto=format&fit=crop' },
  { id: 'w2', name: 'Gold Hoop Droplets', price: '$850', image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?q=80&w=900&auto=format&fit=crop' },
  { id: 'w3', name: 'Sapphire Pendant', price: '$2,400', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900&auto=format&fit=crop' },
  { id: 'w4', name: 'Pearl Choker', price: '$1,100', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=900&auto=format&fit=crop' },
  { id: 'w5', name: 'Ruby Studs', price: '$950', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=900&auto=format&fit=crop' },
  { id: 'w6', name: 'Platinum Ring', price: '$3,200', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop' },
];

const SUGGESTIONS: WishlistItem[] = [
  { id: 's1', name: 'Gold Link Bracelet', price: '$420', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=600&auto=format&fit=crop' },
  { id: 's2', name: 'Classic Pearl Drops', price: '$380', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop' },
  { id: 's3', name: 'Travel Jewelry Case', price: '$145', image: 'https://images.unsplash.com/photo-1603561596112-db6a9f9d2edd?q=80&w=600&auto=format&fit=crop' },
  { id: 's4', name: 'Rose Gold Set', price: '$650', image: 'https://images.unsplash.com/photo-1611107683227-e9060eccd846?q=80&w=600&auto=format&fit=crop' },
];

const WishlistPage: React.FC = () => {
  return (
    <div className="bg-[#F6F1E8] text-[#1C1C1C]">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-[#0E4F3C] mb-4 italic">Your Wishlist</h2>
          <p className="text-[#6F6F6F] uppercase tracking-[0.3em] text-sm">6 Exquisite Pieces Curated By You</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {WISHLIST_ITEMS.map((item) => (
            <article key={item.id} className="group relative flex flex-col">
              <div className="relative aspect-[4/5] bg-[#ECE6E7] overflow-hidden border border-[rgba(198,167,94,0.15)] group-hover:border-[rgba(198,167,94,0.35)] transition-colors">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button className="absolute top-4 right-4 bg-[#F6F1E8]/85 backdrop-blur-sm p-1.5 hover:bg-[#0E4F3C] hover:text-[#F6F1E8] transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-6 text-center px-4">
                <h3 className="font-serif text-xl mb-1 group-hover:text-[#0E4F3C] transition-colors">{item.name}</h3>
                <p className="text-[#6F6F6F] text-sm mb-6 tracking-widest">{item.price}</p>
                <button className="w-full bg-[#0A3F30] text-[#F6F1E8] py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#115A46] transition-all">
                  Add to Bag
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-32 pt-16 border-t border-[rgba(198,167,94,0.2)]">
          <h2 className="font-serif text-3xl mb-10 italic text-[#0E4F3C]">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SUGGESTIONS.map((item) => (
              <article key={item.id} className="group cursor-pointer">
                <div className="aspect-square bg-white overflow-hidden mb-4 border border-[rgba(198,167,94,0.15)] group-hover:border-[rgba(198,167,94,0.35)] transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-xs uppercase tracking-widest font-bold">{item.name}</p>
                <p className="text-xs text-[#6F6F6F]">{item.price}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WishlistPage;
