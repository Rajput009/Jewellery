import React from 'react';
import { Sparkles, ShoppingBag } from 'lucide-react';

const NEW_ITEMS = [
  {
    id: 'n1',
    name: 'Celeste Diamond Arc Ring',
    subtitle: '18k Gold - Limited Drop',
    price: '$2,980',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'n2',
    name: 'Aurora Pearl Lariat',
    subtitle: 'Freshwater Pearl - Hand-set',
    price: '$1,640',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'n3',
    name: 'Verde Emerald Signet',
    subtitle: 'Vintage Cut - Custom Polish',
    price: '$3,220',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'n4',
    name: 'Luna Twin Hoops',
    subtitle: 'Satin Gold - Lightweight',
    price: '$780',
    image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'n5',
    name: 'Noir Pavé Bracelet',
    subtitle: 'Black Diamond Accents',
    price: '$2,050',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'n6',
    name: 'Isla Drop Pendant',
    subtitle: 'Rose Gold - New Edit',
    price: '$1,150',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=900&auto=format&fit=crop',
  },
];

const NewArrivalsPage: React.FC = () => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] m-4 md:m-0 rounded-lg md:rounded-none p-6 md:p-10">
      <div className="relative rounded-md overflow-hidden border border-[rgba(198,167,94,0.2)] mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3F30] via-[#0E4F3C]/80 to-[#115A46]/40" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#F6F1E8_0.6px,transparent_0.6px)] [background-size:3px_3px]" />
        <div className="relative py-16 px-8 md:px-14 text-[#F6F1E8]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#E4DBCE]">Seasonal Edit</p>
          <h1 className="font-serif text-4xl md:text-6xl italic mt-3">New Arrivals</h1>
          <p className="mt-4 max-w-xl text-[#E4DBCE]">
            Freshly crafted pieces from our latest atelier release, designed for elevated everyday styling.
          </p>
          <button className="mt-7 inline-flex items-center gap-2 bg-[#C6A75E] text-[#1C1C1C] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#B8954C] transition-colors">
            <Sparkles size={14} />
            Explore Drop
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl md:text-3xl italic text-[#0E4F3C]">Latest Pieces</h2>
        <p className="text-xs uppercase tracking-widest text-[#6F6F6F]">Just In - 6 Items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {NEW_ITEMS.map((item) => (
          <article key={item.id} className="group">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[rgba(198,167,94,0.15)] group-hover:border-[rgba(198,167,94,0.35)] group-hover:shadow-[0_8px_20px_rgba(10,63,48,0.08)] transition-all">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 py-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <button className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0E4F3C]">
                  <ShoppingBag size={14} />
                  Add to Bag
                </button>
              </div>
            </div>
            <h3 className="mt-4 text-base font-semibold">{item.name}</h3>
            <p className="text-sm text-[#6F6F6F] mt-1">{item.subtitle}</p>
            <p className="text-[#0E4F3C] font-bold mt-2">{item.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsPage;
