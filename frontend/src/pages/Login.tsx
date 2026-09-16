import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../lib/api';
import { ROLE_HOME } from '../lib/types';
import PasswordInput from '../components/PasswordInput';

export default function Login() {
  const { t } = useTranslation('auth');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const user = await login(email, password);
      const from = (location.state as { from?: string } | null)?.from ?? ROLE_HOME[user.role];
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('login.errorDefault'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ultra flex items-center justify-center px-[6%] pt-20">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl border border-brand-light/10">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-orange text-white flex items-center justify-center rounded-xl mx-auto mb-4 text-2xl font-black">P</div>
          <h2 className="text-2xl font-extrabold text-brand-dark uppercase tracking-tight">{t('login.heading')}</h2>
          <p className="text-sm text-brand-light mt-2">{t('login.subheading')}</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('login.emailLabel')}</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
              placeholder={t('login.emailPlaceholder')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('login.passwordLabel')}</label>
              <Link to="/forgot-password" className="text-xs text-brand-orange hover:underline">{t('login.forgotPassword')}</Link>
            </div>
            <PasswordInput
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.passwordPlaceholder')}
              autoComplete="current-password"
              showLabel={t('login.showPassword')}
              hideLabel={t('login.hidePassword')}
            />
          </div>

          {error && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 leading-relaxed">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-brand-dark text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? t('login.submitting') : t('login.submit')}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-brand-light/20 pt-6">
          <p className="text-sm text-brand-mid">
            {t('login.newToPackton')} <Link to="/register" className="text-brand-orange font-bold hover:underline">{t('login.createAccount')}</Link>
          </p>
          <p className="text-sm text-brand-mid mt-2">
            {t('login.becomePartner')} <Link to="/contact" className="text-brand-orange font-bold hover:underline">{t('login.contactUs')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
