import React from 'react';
import { ArrowRight, MapPin, MessageCircle, ShoppingBag, Store } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { listProducts } from '../api/products';
import type { ProductCard } from '../api/types';
import { findLocation, getNearbyLocations } from '../data/pakistanLocations';

const tierDescriptions: Record<string, string> = {
  mega: 'High-demand luxury hub with premium delivery slots and extended concierge hours.',
  large: 'Fast-moving market with curated sets for weddings, engagements, and gifting.',
  growing: 'Rising demand center with priority dispatch and styling support.',
};

const LocationPage: React.FC = () => {
  const { citySlug } = useParams();
  const location = findLocation(citySlug);
  const [products, setProducts] = React.useState<ProductCard[]>([]);

  React.useEffect(() => {
    const run = async () => {
      const result = await listProducts({ limit: 6, search: location?.city });
      setProducts(result);
    };

    void run();
  }, [location?.city]);

  if (!location) {
    return (
      <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-6 md:p-10">
        <h1 className="text-3xl font-light">City not found</h1>
        <p className="mt-3 text-sm text-[#6F6F6F]">Choose a location from Pakistan to view curated jewelry picks.</p>
        <a className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#0E4F3C]" href="/pakistan">
          Back to Pakistan locations <ArrowRight size={14} />
        </a>
      </section>
    );
  }

  const nearby = getNearbyLocations(location.slug);

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0E4F3C]/70">Pakistan Jewelry Delivery</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-light">Luxury Jewelry in {location.city}</h1>
            <p className="mt-4 text-sm md:text-base text-[#4D4D4D]">
              {location.city} · {location.province} · {location.region}
            </p>
            <p className="mt-4 text-sm text-[#4D4D4D]">{tierDescriptions[location.populationTier]}</p>
            <p className="mt-4 text-sm text-[#4D4D4D]">{location.storeNote}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/collections"
                className="inline-flex items-center gap-2 bg-[#0A3F30] text-[#F6F1E8] px-5 py-3 text-xs uppercase tracking-[0.2em]"
              >
                Shop {location.city} Picks <ShoppingBag size={14} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#C6A75E] text-[#0E4F3C] px-5 py-3 text-xs uppercase tracking-[0.2em]"
              >
                Book a Store Visit <Store size={14} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-[rgba(198,167,94,0.3)] text-[#0E4F3C] px-5 py-3 text-xs uppercase tracking-[0.2em]"
              >
                WhatsApp Concierge <MessageCircle size={14} />
              </a>
            </div>
          </div>

          <div className="bg-white border border-[rgba(198,167,94,0.2)] p-6 w-full lg:w-[320px]">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#C6A75E]" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">Local Availability</p>
            </div>
            <ul className="mt-4 text-sm text-[#4D4D4D] space-y-2">
              <li>Insured delivery within {location.city} in 24-72 hours.</li>
              <li>Priority appointment slots for bridal sets.</li>
              <li>Video consultation for matching sets and styling.</li>
            </ul>
            <div className="mt-6 border-t border-[rgba(198,167,94,0.2)] pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">Nearby cities</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {nearby.map((item) => (
                  <a key={item.slug} href={`/pakistan/${item.slug}`} className="text-xs uppercase tracking-widest text-[#0E4F3C]">
                    {item.city}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white border border-[rgba(198,167,94,0.2)] overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-[#6F6F6F]">{product.collection}</p>
                <h2 className="mt-2 font-medium">{product.name}</h2>
                <p className="mt-1 text-sm text-[#0E4F3C] font-semibold">{product.priceLabel}</p>
                <p className="mt-2 text-xs text-[#6F6F6F]">Best for {location.city} ceremonies & gifting.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#0E4F3C]">
                  Add to cart <ArrowRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 bg-[#EFE7DA] border border-[rgba(198,167,94,0.2)] p-6">
          <h2 className="text-2xl font-light">Why shoppers in {location.city} choose Eluxee</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#4D4D4D]">
            <div>
              <p className="font-semibold">Trusted delivery</p>
              <p>Insured packaging and verified handoff for every jewelry order.</p>
            </div>
            <div>
              <p className="font-semibold">Local styling insight</p>
              <p>Curated recommendations for {location.city} weddings, engagement parties, and family gifts.</p>
            </div>
            <div>
              <p className="font-semibold">Concierge support</p>
              <p>Dedicated stylist and sizing assistance before checkout.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">Ready to visit in person?</p>
            <h3 className="text-2xl font-light">Reserve a store appointment in {location.city}</h3>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C6A75E] text-[#1C1C1C] px-5 py-3 text-xs uppercase tracking-[0.2em]"
          >
            Book store visit <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationPage;
