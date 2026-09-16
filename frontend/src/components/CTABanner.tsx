import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CTABanner() {
  const { t } = useTranslation('home');
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto bg-black text-white p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden shadow-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-5 uppercase">
          {t('ctaBanner.heading')}
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8 text-sm md:text-base font-light">
          {t('ctaBanner.paragraph')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="bg-brand-orange text-white font-bold text-sm px-8 py-4 rounded-full uppercase tracking-wider hover:bg-white hover:text-brand-dark transition-colors shadow-lg">
            {t('ctaBanner.ctaPrimary')}
          </Link>
          <Link to="/login" className="bg-white/10 border border-white/20 text-white font-bold text-sm px-8 py-4 rounded-full uppercase tracking-wider hover:bg-white/20 transition-colors">
            {t('ctaBanner.ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}