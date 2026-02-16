import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

type ContactPageProps = {
  onOpenFaq?: () => void;
};

const ContactPage: React.FC<ContactPageProps> = ({ onOpenFaq }) => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <h1 className="text-3xl md:text-4xl font-light">Contact Concierge</h1>
      <p className="mt-3 max-w-2xl text-sm md:text-base text-[#4D4D4D] leading-relaxed">
        Our jewelry advisors are available daily for styling, order help, and bespoke requests.
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form className="bg-white border border-[rgba(198,167,94,0.22)] p-6 space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C] font-semibold">Full Name</label>
            <input className="mt-2 w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C] font-semibold">Email</label>
            <input type="email" className="mt-2 w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C] font-semibold">Message</label>
            <textarea rows={5} className="mt-2 w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          </div>
          <button type="button" className="w-full py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors">
            Send Request
          </button>
        </form>

        <div className="space-y-4">
          <div className="bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold"><Mail size={16} className="text-[#0E4F3C]" /> concierge@eluxee.com</p>
          </div>
          <div className="bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold"><Phone size={16} className="text-[#0E4F3C]" /> 1-800-ELUXEE</p>
          </div>
          <div className="bg-[#EFE7DA] border border-[rgba(198,167,94,0.22)] p-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold"><MapPin size={16} className="text-[#0E4F3C]" /> Fifth Avenue, New York</p>
          </div>
          <button
            type="button"
            onClick={onOpenFaq}
            className="w-full py-3 border border-[rgba(198,167,94,0.45)] text-[#0E4F3C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#EFE7DA] transition-colors"
          >
            Read FAQ
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
