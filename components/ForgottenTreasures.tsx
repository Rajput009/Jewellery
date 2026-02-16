import React from 'react';
import ScrollReveal from './ScrollReveal';

const PRODUCTS = [
  {
    id: 1,
    productId: 'c1',
    name: 'SIGNATURE GOLD RING',
    detail: '14ct Gold Fill',
    price: '$240.00',
    image: 'https://images.unsplash.com/photo-1598560976315-182f03df53d5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    productId: 'c2',
    name: 'EMERALD DROP PENDANT',
    detail: 'Ethically Sourced',
    price: '$450.00',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc5e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    productId: 'c3',
    name: 'CHUNKED SILVER CUFF',
    detail: 'Solid sterling silver',
    price: '$120.00',
    image: 'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=600&auto=format&fit=crop'
  }
];

type ForgottenTreasuresProps = {
  onOpenProduct?: (productId: string) => void;
};

const ForgottenTreasures: React.FC<ForgottenTreasuresProps> = ({ onOpenProduct }) => {
  return (
    <section className="w-full bg-[#0A3F30] px-6 md:px-12 py-24 border-t border-[rgba(198,167,94,0.15)] [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
      <div className="w-full">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#F6F1E8] tracking-wide">
            THE FORGOTTEN TREASURES
          </h2>
          <a href="#" className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#E4DBCE] hover:text-[#C6A75E] transition-colors uppercase mb-1.5 pb-1 border-b border-transparent hover:border-[rgba(198,167,94,0.2)]">
            Browse All Items
          </a>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, idx) => (
            <ScrollReveal key={product.id} delayMs={80 + idx * 70}>
              <article
                className="group route-cursor"
                data-route-link="true"
                onClick={() => onOpenProduct?.(product.productId)}
                role="button"
              >
              <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#0E4F3C] border border-[rgba(198,167,94,0.15)] group-hover:border-[rgba(198,167,94,0.3)] transition-colors">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                {/* Subtle overlay to enhance moody aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3F30]/70 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="mt-6 text-center flex flex-col items-center gap-1">
                <h3 className="text-[#F6F1E8] text-xs md:text-sm font-bold tracking-widest uppercase">
                  {product.name}
                </h3>
                <p className="text-[#E4DBCE]/70 text-[10px] font-medium tracking-widest uppercase">
                  {product.detail}
                </p>
                <p className="text-[#C6A75E] text-sm font-medium mt-1 font-mono">
                  {product.price}
                </p>
              </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForgottenTreasures;
