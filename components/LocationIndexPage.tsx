import React from 'react';
import { ArrowRight, MapPin, Phone, Sparkles, Store } from 'lucide-react';
import { PAKISTAN_LOCATIONS } from '../data/pakistanLocations';

const tierLabel: Record<string, string> = {
  mega: 'Mega City',
  large: 'High Population',
  growing: 'Growing Hub',
};

const LocationIndexPage: React.FC = () => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#0E4F3C]/70">Pakistan Locations</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-light">Shop Fine Jewelry in Pakistan</h1>
        <p className="mt-4 text-sm md:text-base text-[#4D4D4D]">
          Explore high-demand cities with curated collections, concierge support, and insured delivery. Choose your city to
          unlock location-specific styling edits and store appointment options.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PAKISTAN_LOCATIONS.map((location) => (
            <a
              key={location.slug}
              href={`/pakistan/${location.slug}`}
              className="group bg-white border border-[rgba(198,167,94,0.2)] p-5 transition-all hover:border-[rgba(198,167,94,0.45)] hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">{location.province}</p>
                  <h2 className="text-xl font-semibold text-[#0E4F3C] mt-2">{location.city}</h2>
                </div>
                <MapPin className="text-[#C6A75E]" size={20} />
              </div>
              <p className="mt-3 text-sm text-[#4D4D4D]">{tierLabel[location.populationTier]} · {location.region}</p>
              <p className="mt-4 text-xs text-[#6F6F6F]">{location.storeNote}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#0E4F3C]">
                View city picks <ArrowRight size={14} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 bg-[#EFE7DA] border border-[rgba(198,167,94,0.2)] p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Store size={20} className="text-[#0E4F3C]" />
            <div>
              <p className="text-sm font-semibold">Book a Store Visit</p>
              <p className="text-xs text-[#6F6F6F]">Priority appointments in Karachi, Lahore, Islamabad.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-[#0E4F3C]" />
            <div>
              <p className="text-sm font-semibold">Concierge Hotline</p>
              <p className="text-xs text-[#6F6F6F]">Same-day styling help across Pakistan.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-[#0E4F3C]" />
            <div>
              <p className="text-sm font-semibold">Add-to-Cart Incentives</p>
              <p className="text-xs text-[#6F6F6F]">Exclusive packaging & free polishing on checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationIndexPage;
