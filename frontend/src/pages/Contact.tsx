import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { apiFetch, ApiError } from '../lib/api';

export default function Contact() {
  const { t } = useTranslation('contact');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeVolume, setActiveVolume] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const volumes = t('form.volumes', { returnObjects: true }) as string[];

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError(t('errors.missingFields'));
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          company: formData.company || undefined,
          email: formData.email,
          message: formData.message || undefined,
          estimatedVolume: activeVolume ?? undefined,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('errors.submitFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white font-sans min-h-screen flex flex-col">
      
      {/* MASSIVE SPLIT-SCREEN LAYOUT */}
      <section className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SIDE: Dark Architectural Command Center */}
        <div className="bg-[#1A1A1A] text-white pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 lg:px-16 xl:px-24 flex flex-col justify-between relative overflow-hidden">
          {/* Blueprint Background Lines */}
          <div className="absolute inset-0 pointer-events-none flex justify-center w-full">
            <div className="w-px h-full bg-white/5 absolute left-[20%]"></div>
            <div className="w-px h-full bg-white/5 absolute right-[20%]"></div>
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-[2px] bg-[#E8520A]"></div>
              <p className="text-[#E8520A] font-bold tracking-[0.2em] uppercase text-xs">
                {t('eyebrow')}
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-6">
              {t('headingLine1')} <br/>
              <span className="text-white/30">{t('headingLine2')}</span>
            </h1>

            <p className="text-base lg:text-lg text-white/50 font-light leading-relaxed mb-12">
              {t('intro')}
            </p>
          </div>

          {/* Hard Contact Data */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div>
              <p className="text-[#E8520A] font-mono text-xs font-bold tracking-widest uppercase mb-3">{t('directLineLabel')}</p>
              <a href="mailto:info@packton.com" className="text-xl font-bold text-white hover:text-[#E8520A] transition-colors">
                info@packton.com
              </a>
            </div>
            <div>
              <p className="text-[#E8520A] font-mono text-xs font-bold tracking-widest uppercase mb-3">{t('headquartersLabel')}</p>
              <p className="text-lg font-light text-white/70">
                {t('headquartersLine1')}<br/>
                {t('headquartersLine2')}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Intake Terminal (Form) */}
        <div className="bg-white pt-16 pb-16 lg:pt-36 lg:pb-24 px-6 lg:px-16 xl:px-24 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            
            <h2 className="text-3xl font-black text-brand-dark tracking-tighter mb-10">
              {t('formHeading')}
            </h2>

            {submitted ? (
              <div className="border border-[#E8520A]/30 bg-[#E8520A]/5 p-8 flex flex-col gap-3">
                <p className="text-lg font-bold text-brand-dark">{t('success.heading')}</p>
                <p className="text-gray-500 font-light leading-relaxed">
                  <Trans i18nKey="success.message" t={t} values={{ email: formData.email }} components={{ 1: <span className="font-bold text-brand-dark" /> }}>
                    {`Our operations team will reach out to <1>{{email}}</1> shortly.`}
                  </Trans>
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-bold text-[#E8520A] uppercase tracking-widest w-fit hover:underline"
                >
                  {t('success.resetButton')}
                </button>
              </div>
            ) : (
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

              {/* Grid for Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">{t('form.fullNameLabel')}</label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={t('form.fullNamePlaceholder')}
                    required
                    value={formData.name}
                    onChange={handleChange('name')}
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-brand-dark focus:bg-white focus:border-[#E8520A] focus:ring-1 focus:ring-[#E8520A] transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">{t('form.companyLabel')}</label>
                  <input
                    type="text"
                    name="organization"
                    autoComplete="organization"
                    placeholder={t('form.companyPlaceholder')}
                    value={formData.company}
                    onChange={handleChange('company')}
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-brand-dark focus:bg-white focus:border-[#E8520A] focus:ring-1 focus:ring-[#E8520A] transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">{t('form.emailLabel')}</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={t('form.emailPlaceholder')}
                  required
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="w-full bg-gray-50 border border-gray-200 p-4 text-brand-dark focus:bg-white focus:border-[#E8520A] focus:ring-1 focus:ring-[#E8520A] transition-all outline-none"
                />
              </div>

              {/* Volume Selection (Radio Buttons styled as pills) */}
              <div className="flex flex-col gap-4 mt-4">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">{t('form.volumeLabel')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {volumes.map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setActiveVolume(vol)}
                      className={`p-4 border text-sm font-medium transition-all text-left ${
                        activeVolume === vol
                          ? "border-[#E8520A] bg-[#E8520A]/5 text-[#E8520A]"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Area */}
              <div className="flex flex-col gap-3 mt-4">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-widest">{t('form.messageLabel')}</label>
                <textarea
                  rows={4}
                  placeholder={t('form.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange('message')}
                  className="w-full bg-gray-50 border border-gray-200 p-4 text-brand-dark focus:bg-white focus:border-[#E8520A] focus:ring-1 focus:ring-[#E8520A] transition-all outline-none resize-none"
                ></textarea>
              </div>

              {error && (
                <p className="text-sm font-bold text-red-600">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full bg-[#1A1A1A] text-white p-5 font-black uppercase tracking-[0.15em] text-sm hover:bg-[#E8520A] transition-colors duration-300 flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? t('form.submitting') : t('form.submit')}
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>

            </form>
            )}

          </div>
        </div>

      </section>
    </div>
  );
}   