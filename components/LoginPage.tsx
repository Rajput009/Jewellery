import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../api/auth';

type LoginPageProps = {
  onLoginSuccess?: () => void;
  onOpenRegister?: () => void;
  onOpenForgotPassword?: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onOpenRegister, onOpenForgotPassword }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const redirectTo = React.useMemo(() => {
    const raw = new URLSearchParams(location.search).get('redirect') ?? '';
    return raw.startsWith('/') ? raw : '';
  }, [location.search]);
  const defaultAfterLogin = '/account';

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <div className="max-w-md mx-auto bg-white border border-[rgba(198,167,94,0.22)] p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-light">Sign In</h1>
        <p className="mt-2 text-sm text-[#6F6F6F]">Access your account, orders, and wishlist.</p>

        <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C] font-semibold">Email</label>
            <input type="email" className="mt-2 w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.2em] text-[#0E4F3C] font-semibold">Password</label>
            <input type="password" className="mt-2 w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button
            type="button"
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);
                await signInWithEmail(email, password);
                if (redirectTo) {
                  navigate(redirectTo);
                  return;
                }
                if (onLoginSuccess) {
                  onLoginSuccess();
                  return;
                }
                navigate(defaultAfterLogin);
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Unable to sign in');
              } finally {
                setLoading(false);
              }
            }}
            className="w-full py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        <button
          type="button"
          onClick={() => {
            const suffix = redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : '';
            if (onOpenForgotPassword) {
              onOpenForgotPassword();
              return;
            }
            navigate(`/forgot-password${suffix}`);
          }}
          className="mt-4 text-xs uppercase tracking-widest text-[#0E4F3C] hover:text-[#B8954C]"
        >
          Forgot Password?
        </button>
        <p className="mt-4 text-sm text-[#4D4D4D]">
          New here?{' '}
          <button
            type="button"
            onClick={() => {
              const suffix = redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : '';
              if (onOpenRegister) {
                onOpenRegister();
                return;
              }
              navigate(`/register${suffix}`);
            }}
            className="text-[#0E4F3C] font-semibold hover:text-[#B8954C]"
          >
            Create account
          </button>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
