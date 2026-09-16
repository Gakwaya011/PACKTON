import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ServiceSpec {
  label: string;
  value: string;
}

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  specs: ServiceSpec[];
}

const serviceIcons: Record<string, ReactElement> = {
  "01": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  "02": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "03": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  "04": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

function useReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function Services() {
  const { t } = useTranslation('services');
  const [isLoaded, setIsLoaded] = useState(false);
  const stack = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = t('services', { returnObjects: true }) as ServiceItem[];

  return (
    <div className="w-full bg-white font-sans">

      {/* 1. DARK ARCHITECTURAL HERO */}
      <section className="bg-brand-dark pt-28 pb-20 lg:pt-36 lg:pb-28 px-6 lg:px-12 relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1760px] mx-auto px-6 lg:px-12">
           <div className="w-px h-full bg-white/5"></div>
           <div className="w-full h-full flex justify-between">
              <div className="w-px h-full bg-white/5 ml-[33%]"></div>
              <div className="w-px h-full bg-white/5 mr-[33%] hidden lg:block"></div>
           </div>
           <div className="w-px h-full bg-white/5"></div>
        </div>

        <div className="max-w-[1760px] mx-auto relative z-10">
          <div
            className={`flex items-center gap-4 mb-10 transform transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="w-8 h-[2px] bg-brand-orange"></div>
            <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
              {t('hero.eyebrow')}
            </p>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-8 transform transition-all duration-1000 delay-500 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <span className="text-white block mb-2">{t('hero.headingLine1')}</span>
            <span className="text-white/30 block">{t('hero.headingLine2')}</span>
          </h1>

          <p
            className={`text-base md:text-lg text-white/50 font-light max-w-3xl leading-relaxed transform transition-all duration-1000 delay-700 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {t('hero.paragraph')}
          </p>
        </div>
      </section>

      {/* 2. THE SERVICES STACK (Sticky Left, Data Right) */}
      <section ref={stack.ref} className="py-14 lg:py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1760px] mx-auto">

          <div className="flex flex-col gap-0 border-t border-gray-200">
            {services.map((service, index) => (
              <div
                key={service.id}
                style={{ transitionDelay: `${index * 120}ms` }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-10 lg:py-14 border-b border-gray-200 group transform transition-all duration-700 ease-out ${
                  stack.isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >

                {/* Left Side: Sticky ID & Title */}
                <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 h-fit">
                  <div className="w-14 h-14 bg-gray-50 border border-gray-200 text-brand-dark flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all duration-500">
                    {serviceIcons[service.id]}
                  </div>
                  <span className="text-gray-300 font-mono text-lg font-bold mb-4 block group-hover:text-brand-orange transition-colors duration-300">
                    {service.id} //
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tighter leading-[1.1] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-base text-brand-orange font-bold tracking-wide">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Right Side: Description & Spec Grid */}
                <div className="lg:col-span-7 flex flex-col lg:pl-16">
                  <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed mb-10">
                    {service.description}
                  </p>

                  {/* Informational Density: The Spec Box */}
                  <div className="bg-gray-50 border border-gray-200 p-6 lg:p-8 w-full mt-auto">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">{t('specsLabel')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {service.specs.map((spec, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <span className="font-mono text-xs text-brand-dark font-bold uppercase tracking-widest">{spec.label}</span>
                          <span className="text-gray-500 font-light text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internal CTA */}
                  <div className="mt-10">
                    <Link to="/contact" className="inline-flex items-center gap-3 text-sm font-bold text-brand-dark uppercase tracking-widest group/link hover:text-brand-orange transition-colors">
                      {t('deployService')}
                      <span className="transform transition-transform duration-300 group-hover/link:translate-x-2 text-brand-orange">→</span>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. LIGHT BOTTOM CTA */}
      <section className="bg-gray-50 py-20 px-6 lg:px-12 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 bg-brand-dark flex items-center justify-center mb-8">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter mb-6">
            {t('cta.heading')}
          </h2>
          <p className="text-base lg:text-lg text-gray-500 font-light mb-10">
            {t('cta.paragraph')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-brand-orange text-white font-black uppercase tracking-[0.15em] text-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-orange/30"
          >
            {t('cta.button')}
            <span className="transform transition-transform duration-300">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
