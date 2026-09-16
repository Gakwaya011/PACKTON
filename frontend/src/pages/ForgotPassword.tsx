import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../lib/api';

export default function ForgotPassword() {
  const { t } = useTranslation('auth');

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await apiFetch('/auth/forgot-password', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('forgotPassword.errorDefault'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ultra flex items-center justify-center px-[6%] pt-20">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl border border-brand-light/10">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-orange text-white flex items-center justify-center rounded-xl mx-auto mb-4 text-2xl font-black">P</div>
          <h2 className="text-2xl font-extrabold text-brand-dark uppercase tracking-tight">{t('forgotPassword.heading')}</h2>
          <p className="text-sm text-brand-light mt-2">{t('forgotPassword.subheading')}</p>
        </div>

        {submitted ? (
          <div className="flex flex-col gap-6">
            <p className="text-sm text-brand-dark bg-brand-orange/10 border border-brand-orange/20 rounded-lg p-4 leading-relaxed">
              {t('forgotPassword.successMessage')}
            </p>
            <Link
              to="/login"
              className="text-center bg-brand-dark text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors"
            >
              {t('forgotPassword.backToLogin')}
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('forgotPassword.emailLabel')}</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
                placeholder={t('forgotPassword.emailPlaceholder')}
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
              {submitting ? t('forgotPassword.submitting') : t('forgotPassword.submit')}
            </button>

            <Link to="/login" className="text-center text-sm text-brand-mid hover:text-brand-orange transition-colors">
              {t('forgotPassword.backToLogin')}
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
