import React from 'react';

type LoginPageProps = {
  onLoginSuccess?: () => void;
  onOpenRegister?: () => void;
  onOpenForgotPassword?: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onOpenRegister, onOpenForgotPassword }) => {
  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <div className="max-w-md mx-auto bg-white border border-[rgba(198,167,94,0.22)] p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-light">Sign In</h1>
        <p className="mt-2 text-sm text-[#6F6F6F]">Access your account, orders, and wishlist.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C] font-semibold">Email</label>
            <input type="email" className="mt-2 w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C] font-semibold">Password</label>
            <input type="password" className="mt-2 w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" />
          </div>
          <button
            type="button"
            onClick={onLoginSuccess}
            className="w-full py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
          >
            Sign In
          </button>
        </form>

        <button type="button" onClick={onOpenForgotPassword} className="mt-4 text-xs uppercase tracking-widest text-[#0E4F3C] hover:text-[#B8954C]">
          Forgot Password?
        </button>
        <p className="mt-4 text-sm text-[#4D4D4D]">
          New here?{' '}
          <button type="button" onClick={onOpenRegister} className="text-[#0E4F3C] font-semibold hover:text-[#B8954C]">
            Create account
          </button>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
