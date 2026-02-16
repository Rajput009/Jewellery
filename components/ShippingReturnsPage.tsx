import React from 'react';

type ShippingReturnsPageProps = {
  onContact?: () => void;
};

const ShippingReturnsPage: React.FC<ShippingReturnsPageProps> = ({ onContact }) => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg md:rounded-none m-4 md:m-0 p-5 md:p-10">
      <h1 className="text-3xl md:text-4xl font-light">Shipping & Returns</h1>
      <p className="mt-3 text-sm text-[#4D4D4D] max-w-3xl">
        Every order is packed in signature boxes and shipped with insured premium delivery.
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="bg-white border border-[rgba(198,167,94,0.22)] p-6">
          <h2 className="text-lg font-semibold">Shipping</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#4D4D4D] list-disc pl-5">
            <li>Standard shipping: 3-5 business days (complimentary)</li>
            <li>Express shipping: 1-2 business days</li>
            <li>International delivery available to 35+ countries</li>
            <li>All packages include signature confirmation</li>
          </ul>
        </article>

        <article className="bg-white border border-[rgba(198,167,94,0.22)] p-6">
          <h2 className="text-lg font-semibold">Returns</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#4D4D4D] list-disc pl-5">
            <li>30-day return window for unused pieces</li>
            <li>Made-to-order and engraved items are final sale</li>
            <li>Free return label for domestic orders</li>
            <li>Refunds processed in 5-7 business days</li>
          </ul>
        </article>
      </div>

      <div className="mt-6 bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-[#4D4D4D]">Need help with a specific shipment or return request?</p>
        <button
          type="button"
          onClick={onContact}
          className="px-6 py-2.5 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
        >
          Contact Support
        </button>
      </div>
    </section>
  );
};

export default ShippingReturnsPage;
