import React from 'react';
import { Search } from 'lucide-react';
import { listProducts } from '../api/products';
import type { ProductCard } from '../api/types';

type SearchResultsPageProps = {
  onSelectProduct?: (productId: string) => void;
};

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ onSelectProduct }) => {
  const [query, setQuery] = React.useState('gold ring');
  const [results, setResults] = React.useState<ProductCard[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const products = await listProducts({ search: query, limit: 12 });
        setResults(products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load results.');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-light">Search Results</h1>
        <div className="flex items-center border border-[rgba(198,167,94,0.25)] bg-white px-3 py-2 min-w-[280px]">
          <Search size={16} className="text-[#0E4F3C]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="ml-2 w-full bg-transparent outline-none text-sm" />
        </div>
      </div>

      <p className="mt-3 text-sm text-[#6F6F6F]">
        {loading ? 'Searching...' : `Showing ${results.length} results for "${query}"`}
      </p>
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {results.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectProduct?.(item.id)}
            className="cursor-pointer bg-white border border-[rgba(198,167,94,0.2)] hover:border-[rgba(198,167,94,0.5)] transition-colors"
          >
            <img src={item.image} alt={item.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <p className="text-[10px] uppercase tracking-widest text-[#6F6F6F]">{item.collection}</p>
              <h2 className="mt-1 font-medium">{item.name}</h2>
              <p className="mt-1 text-sm font-semibold">{item.priceLabel}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SearchResultsPage;
