import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation('common');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-brand-white">
      <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs mb-6">{t('blogPlaceholder.eyebrow')}</p>
      <h1 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter mb-6">
        {t('blogPlaceholder.heading')}
      </h1>
      <p className="text-lg text-brand-mid font-light max-w-md mb-10">
        {t('blogPlaceholder.paragraph')}
      </p>
      <Link
        to="/"
        className="bg-brand-orange text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1"
      >
        {t('blogPlaceholder.backHome')}
      </Link>
    </div>
  );
}
