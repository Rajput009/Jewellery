import React from 'react';
import { Gem, Globe2, ShieldCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] m-4 md:m-8 rounded-lg overflow-hidden border border-[rgba(198,167,94,0.15)]">
      <div className="relative px-8 md:px-14 py-16 bg-gradient-to-r from-[#0A3F30] via-[#0E4F3C] to-[#115A46] text-[#F6F1E8]">
        <p className="text-xs uppercase tracking-[0.3em] text-[#E4DBCE]">The House of Eluxee</p>
        <h1 className="font-serif text-4xl md:text-6xl italic mt-3">About</h1>
        <p className="mt-5 max-w-2xl text-[#E4DBCE] leading-relaxed">
          Eluxee is a contemporary fine jewelry house rooted in craftsmanship, ethical sourcing, and timeless design.
          Every collection is created to be worn for a lifetime and passed through generations.
        </p>
      </div>

      <div className="px-8 md:px-14 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="font-serif text-3xl italic text-[#0E4F3C]">Our Story</h2>
            <p className="text-[#6F6F6F] leading-relaxed">
              Founded in New York, Eluxee began as a small atelier creating bespoke heirloom pieces.
              Today, we continue the same philosophy: restrained luxury, exceptional materials, and meaningful detail.
            </p>
            <p className="text-[#6F6F6F] leading-relaxed">
              Our designers and master setters work closely to ensure every ring, pendant, and bracelet reflects precise balance,
              comfort, and enduring beauty.
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[rgba(198,167,94,0.2)]">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
              alt="Jewelry craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white border border-[rgba(198,167,94,0.15)] p-6">
            <Gem className="text-[#0E4F3C] mb-4" size={22} />
            <h3 className="font-semibold uppercase tracking-wide text-sm mb-2">Craftsmanship</h3>
            <p className="text-sm text-[#6F6F6F]">Hand-finished by skilled artisans with strict quality control at every stage.</p>
          </article>
          <article className="bg-white border border-[rgba(198,167,94,0.15)] p-6">
            <ShieldCheck className="text-[#0E4F3C] mb-4" size={22} />
            <h3 className="font-semibold uppercase tracking-wide text-sm mb-2">Ethical Sourcing</h3>
            <p className="text-sm text-[#6F6F6F]">Conflict-free stones and responsibly sourced metals across our collections.</p>
          </article>
          <article className="bg-white border border-[rgba(198,167,94,0.15)] p-6">
            <Globe2 className="text-[#0E4F3C] mb-4" size={22} />
            <h3 className="font-semibold uppercase tracking-wide text-sm mb-2">Global Clients</h3>
            <p className="text-sm text-[#6F6F6F]">Private consultations and concierge service for clients worldwide.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
