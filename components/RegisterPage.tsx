import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '../api/auth';

type RegisterPageProps = {
  onOpenLogin?: () => void;
};

const RegisterPage: React.FC<RegisterPageProps> = ({ onOpenLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const redirectTo = React.useMemo(() => {
    const raw = new URLSearchParams(location.search).get('redirect') ?? '';
    return raw.startsWith('/') ? raw : '';
  }, [location.search]);

  return (
    <section className="bg-[#F6F1E8] text-[#1C1C1C] rounded-lg m-4 md:m-8 p-5 md:p-10">
      <div className="max-w-md mx-auto bg-white border border-[rgba(198,167,94,0.22)] p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-light">Create Account</h1>
        <p className="mt-2 text-sm text-[#6F6F6F]">Join Eluxee for faster checkout and exclusive access.</p>

        <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <input placeholder="Full name" className="w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" value={fullName} onChange={(event) => setFullName(event.target.value)} />
          <input type="email" placeholder="Email" className="w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="password" placeholder="Password" className="w-full border border-[rgba(198,167,94,0.25)] bg-[#FDFBF8] px-3 py-2.5 outline-none focus:border-[#C6A75E]" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button
            type="button"
            className="w-full py-3 bg-[#C6A75E] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8954C] transition-colors"
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);
                setMessage(null);
                await signUpWithEmail(email, password, fullName);
                const suffix = redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : '';
                navigate(`/login${suffix}`);
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Unable to create account');
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="mt-4 text-sm text-[#0E4F3C]">{message}</p> : null}

        <p className="mt-4 text-sm text-[#4D4D4D]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => {
              const suffix = redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : '';
              if (onOpenLogin) {
                onOpenLogin();
                return;
              }
              navigate(`/login${suffix}`);
            }}
            className="text-[#0E4F3C] font-semibold hover:text-[#B8954C]"
          >
            Sign in
          </button>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
