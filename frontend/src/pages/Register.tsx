import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../lib/api';
import PasswordInput from '../components/PasswordInput';

export default function Register() {
  const { t } = useTranslation('auth');
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError(t('register.passwordMismatch'));
      return;
    }

    setSubmitting(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('register.errorDefault'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ultra flex items-center justify-center px-[6%] pt-20">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl border border-brand-light/10">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-orange text-white flex items-center justify-center rounded-xl mx-auto mb-4 text-2xl font-black">P</div>
          <h2 className="text-2xl font-extrabold text-brand-dark uppercase tracking-tight">{t('register.heading')}</h2>
          <p className="text-sm text-brand-light mt-2">{t('register.subheading')}</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('register.fullNameLabel')}</label>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange('name')}
              className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
              placeholder={t('register.fullNamePlaceholder')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('register.emailLabel')}</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange('email')}
              className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
              placeholder={t('register.emailPlaceholder')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('register.phoneLabel')}</label>
            <input
              type="tel"
              name="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra"
              placeholder={t('register.phonePlaceholder')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('register.passwordLabel')}</label>
            <PasswordInput
              required
              minLength={8}
              name="new-password"
              value={formData.password}
              onChange={handleChange('password')}
              placeholder={t('register.passwordPlaceholder')}
              autoComplete="new-password"
              showLabel={t('register.showPassword')}
              hideLabel={t('register.hidePassword')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">{t('register.confirmPasswordLabel')}</label>
            <PasswordInput
              required
              minLength={8}
              name="confirm-password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder={t('register.confirmPasswordPlaceholder')}
              autoComplete="new-password"
              showLabel={t('register.showPassword')}
              hideLabel={t('register.hidePassword')}
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
            {submitting ? t('register.submitting') : t('register.submit')}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-brand-light/20 pt-6">
          <p className="text-sm text-brand-mid">
            {t('register.alreadyHaveAccount')} <Link to="/login" className="text-brand-orange font-bold hover:underline">{t('register.signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
