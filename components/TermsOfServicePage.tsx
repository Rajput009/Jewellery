import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <h1 className="text-3xl md:text-4xl font-light">Terms of Service</h1>
      <p className="mt-3 text-sm text-[#4D4D4D]">Effective date: February 16, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#4D4D4D] max-w-4xl">
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">Orders and Payments</h2>
          <p className="mt-2">All orders are subject to availability, verification, and payment authorization before shipment.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">Pricing and Availability</h2>
          <p className="mt-2">Prices may change without notice. If an error occurs, we will contact you before finalizing your order.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">Returns and Exchanges</h2>
          <p className="mt-2">Return eligibility follows the Shipping & Returns policy and excludes custom engraved or bespoke pieces.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">Limitation of Liability</h2>
          <p className="mt-2">Our liability is limited to the amount paid for products purchased through our platform.</p>
        </section>
      </div>
    </section>
  );
};

export default TermsOfServicePage;
