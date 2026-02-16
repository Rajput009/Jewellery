import React from 'react';

type RegisterPageProps = {
  onOpenLogin?: () => void;
};

const RegisterPage: React.FC<RegisterPageProps> = ({ onOpenLogin }) => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <div className="max-w-md mx-auto bg-white border border-[rgba(198,167,94,0.22)] p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-light">Create Account</h1>
        <p className="mt-2 text-sm text-[#6F6F6F]">Join Eluxee for faster checkout and exclusive access.</p>

        <form className="mt-6 space-y-4">
          <input placeholder="Full name" className="w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          <input type="email" placeholder="Email" className="w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          <input type="password" placeholder="Password" className="w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          <button type="button" className="w-full py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-sm text-[#4D4D4D]">
          Already have an account?{' '}
          <button type="button" onClick={onOpenLogin} className="text-[#0E4F3C] font-semibold hover:text-[#B8954C]">
            Sign in
          </button>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
