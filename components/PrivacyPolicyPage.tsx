import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <h1 className="text-3xl md:text-4xl font-light">Privacy Policy</h1>
      <p className="mt-3 text-sm text-[#4D4D4D]">Last updated: February 16, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#4D4D4D] max-w-4xl">
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">Information We Collect</h2>
          <p className="mt-2">We collect account details, order history, and payment token metadata required to process purchases and provide support.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">How We Use Data</h2>
          <p className="mt-2">Your data is used to fulfill orders, prevent fraud, improve product recommendations, and send account notifications.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">Data Sharing</h2>
          <p className="mt-2">We share limited data with payment processors, delivery partners, and fraud-prevention providers under strict confidentiality.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#1C1C1C]">Your Rights</h2>
          <p className="mt-2">You may request data export, correction, or deletion by contacting concierge@eluxee.com.</p>
        </section>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
