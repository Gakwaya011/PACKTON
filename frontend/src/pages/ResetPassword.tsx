import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../lib/api';
import PasswordInput from '../components/PasswordInput';

export default function ResetPassword() {
  const { t } = useTranslation('auth');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(t('resetPassword.passwordMismatch'));
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch('/auth/reset-password', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ token, password }),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('resetPassword.errorDefault'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ultra flex items-center justify-center px-[6%] pt-20">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl border border-brand-light/10">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-orange text-white flex items-center justify-center rounded-xl mx-auto mb-4 text-2xl font-black">P</div>
          <h2 className="text-2xl font-extrabold text-brand-dark uppercase tracking-tight">{t('resetPassword.heading')}</h2>
          <p className="text-sm text-brand-light mt-2">{t('resetPassword.subheading')}</p>
        </div>

        {!token ? (
          <div className="flex flex-col gap-6">
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-4 leading-relaxed">
              {t('resetPassword.invalidLink')}
            </p>
            <Link
              to="/forgot-password"
              className="text-center bg-brand-dark text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors"
            >
              {t('resetPassword.requestNewLink')}
            </Link>
          </div>
        ) : submitted ? (
          <div className="flex flex-col gap-6">
            <p className="text-sm text-brand-dark bg-brand-orange/10 border border-brand-orange/20 rounded-lg p-4 leading-relaxed">
              {t('resetPassword.successMessage')}
            </p>
            <Link
              to="/login"
              className="text-center bg-brand-dark text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors"
            >
              {t('resetPassword.successCta')}
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('resetPassword.newPasswordLabel')}</label>
              <PasswordInput
                required
                minLength={8}
                name="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('resetPassword.newPasswordPlaceholder')}
                autoComplete="new-password"
                showLabel={t('resetPassword.showPassword')}
                hideLabel={t('resetPassword.hidePassword')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('resetPassword.confirmPasswordLabel')}</label>
              <PasswordInput
                required
                minLength={8}
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                autoComplete="new-password"
                showLabel={t('resetPassword.showPassword')}
                hideLabel={t('resetPassword.hidePassword')}
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
              {submitting ? t('resetPassword.submitting') : t('resetPassword.submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
