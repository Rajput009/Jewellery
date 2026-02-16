import React from 'react';
import { ChevronDown } from 'lucide-react';

type FaqPageProps = {
  onContact?: () => void;
};

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery is 3-5 business days. Express options are available at checkout.',
  },
  {
    q: 'Can I resize my ring after purchase?',
    a: 'Yes. Most rings include one complimentary resize within 90 days of delivery.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Yes. We ship to over 35 countries with insured delivery and customs support.',
  },
  {
    q: 'Can I customize or engrave a piece?',
    a: 'Select products support engraving and bespoke adjustments before checkout.',
  },
];

const FaqPage: React.FC<FaqPageProps> = ({ onContact }) => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg md:rounded-none m-4 md:m-0 p-5 md:p-10">
      <h1 className="text-3xl md:text-4xl font-light">Frequently Asked Questions</h1>

      <div className="mt-8 space-y-3 max-w-4xl">
        {FAQS.map((item) => (
          <details key={item.q} className="bg-white border border-[rgba(198,167,94,0.22)] p-4 group">
            <summary className="list-none cursor-pointer flex items-center justify-between gap-4">
              <span className="font-medium">{item.q}</span>
              <ChevronDown size={16} className="text-[#0E4F3C] group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-sm text-[#4D4D4D]">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onContact}
          className="px-7 py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
        >
          Still Need Help?
        </button>
      </div>
    </section>
  );
};

export default FaqPage;
