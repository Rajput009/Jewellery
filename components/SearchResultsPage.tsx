import React from 'react';
import { Search } from 'lucide-react';

type SearchResultsPageProps = {
  onSelectProduct?: () => void;
};

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ onSelectProduct }) => {
  const results = [
    {
      name: 'Diamond Gold Ring',
      subtitle: 'Premium collection',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
      price: '$1,650',
    },
    {
      name: 'Emerald Halo Necklace',
      subtitle: 'New arrivals',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      price: '$2,900',
    },
    {
      name: 'Classic Gold Bangle',
      subtitle: 'Heritage line',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop',
      price: '$980',
    },
  ];

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-light">Search Results</h1>
        <div className="flex items-center border border-[rgba(198,167,94,0.25)] bg-white px-3 py-2 min-w-[280px]">
          <Search size={16} className="text-[#0E4F3C]" />
          <input defaultValue="gold ring" className="ml-2 w-full bg-transparent outline-none text-sm" />
        </div>
      </div>

      <p className="mt-3 text-sm text-[#6F6F6F]">Showing 3 results for "gold ring"</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {results.map((item) => (
          <article
            key={item.name}
            onClick={onSelectProduct}
            className="cursor-pointer bg-white border border-[rgba(198,167,94,0.2)] hover:border-[rgba(198,167,94,0.5)] transition-colors"
          >
            <img src={item.image} alt={item.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <p className="text-[10px] uppercase tracking-widest text-[#6F6F6F]">{item.subtitle}</p>
              <h2 className="mt-1 font-medium">{item.name}</h2>
              <p className="mt-1 text-sm font-semibold">{item.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SearchResultsPage;
