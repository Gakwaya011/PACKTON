import { useEffect, useRef, useState, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface Pillar {
  label: string;
  title: string;
  description: string;
}

interface CoreValue {
  id: string;
  title: string;
  description: string;
}

const pillarIcons: ReactElement[] = [
  (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.109.732a9 9 0 01-6.086-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5m0 10.5v-10.5" />
    </svg>
  ),
  (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  )
];

const coreValueIcons: Record<string, ReactElement> = {
  "01": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  "02": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "03": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  "04": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.032 8.822-7.5 9.75-4.468-.928-7.5-5.194-7.5-9.75V6.108a2.25 2.25 0 011.16-1.965l5.25-2.917a2.25 2.25 0 012.18 0l5.25 2.917A2.25 2.25 0 0121 6.108V12z" />
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
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function About() {
  const { t } = useTranslation('about');
  const [isLoaded, setIsLoaded] = useState(false);
  const missionVision = useReveal();
  const values = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const pillars = t('missionVision.pillars', { returnObjects: true }) as Pillar[];
  const coreValues = t('values.items', { returnObjects: true }) as CoreValue[];

  return (
    <div className="w-full bg-white font-sans">

      {/* 1. CINEMATIC PHOTO HERO */}
      <section className="relative min-h-[80vh] lg:min-h-[88vh] flex items-end overflow-hidden bg-black border-b border-white/5">

        {/* Background photo with a slow Ken Burns push-in */}
        <img
          src="/about-hero.jpg"
          alt={t('hero.imageAlt')}
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 transform transition-all duration-[3000ms] ease-out ${
            isLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        />

        {/* Gradients for legibility — dark base + a left-side wash for the copy */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent z-0"></div>

        <div className="relative z-10 w-full max-w-[1760px] mx-auto px-6 lg:px-12 pt-40 pb-16 lg:pb-24">
          <div
            className={`flex items-center gap-4 mb-8 transform transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="w-8 h-[2px] bg-brand-orange"></div>
            <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
              {t('hero.eyebrow')}
            </p>
          </div>

          <h1
            className={`max-w-3xl text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-8 drop-shadow-lg transform transition-all duration-1000 delay-500 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <span className="text-white block mb-2">{t('hero.headingLine1')}</span>
            <span className="text-white/40 block">{t('hero.headingLine2')}</span>
          </h1>

          <p
            className={`text-base md:text-lg text-white/60 font-light max-w-xl leading-relaxed transform transition-all duration-1000 delay-700 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {t('hero.paragraph')}
          </p>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
        <div className="max-w-[1760px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Sticky Left Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-brand-orange"></div>
              <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
                {t('story.eyebrow')}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter leading-[1.1] lg:sticky lg:top-32 pr-8">
              {t('story.headingLine1')} <span className="text-brand-orange">{t('story.headingHighlight')}</span>
            </h2>
          </div>

          {/* Right Column Text */}
          <div className="lg:col-span-7 lg:pl-16 flex flex-col gap-8">
            <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed">
              {t('story.paragraph1')}
            </p>
            <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed">
              {t('story.paragraph2')}
            </p>

            <div className="mt-8 inline-flex items-center gap-5 p-6 bg-gray-50 border border-gray-100 w-fit">
              <div className="w-12 h-12 bg-brand-dark flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-1">{t('story.cardTitle')}</p>
                <p className="text-xs text-gray-400 font-mono">{t('story.cardSubtitle')}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section ref={missionVision.ref} className="bg-gray-50 py-20 lg:py-24 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-[1760px] mx-auto">

          <div className="mb-16 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-brand-orange"></div>
              <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
                {t('missionVision.eyebrow')}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter">
              {t('missionVision.heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.label}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`bg-white p-8 lg:p-10 border border-gray-200 transform transition-all duration-700 ease-out hover:border-brand-orange/30 hover:shadow-xl ${
                  missionVision.isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center border border-brand-orange text-brand-orange rounded-full mb-8">
                  {pillarIcons[index]}
                </div>
                <p className="text-brand-orange font-bold tracking-[0.15em] uppercase text-xs mb-3">
                  {pillar.label}
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-brand-dark tracking-tight mb-4">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section ref={values.ref} className="bg-white py-20 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1760px] mx-auto">

          <div className="mb-16 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-brand-orange"></div>
              <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
                {t('values.eyebrow')}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter mb-6">
              {t('values.heading')}
            </h2>
            <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed">
              {t('values.paragraph')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={value.id}
                style={{ transitionDelay: `${index * 120}ms` }}
                className={`bg-gray-50 p-8 border border-gray-200 flex flex-col h-full transform transition-all duration-700 ease-out hover:border-brand-orange/30 hover:shadow-xl hover:-translate-y-1 ${
                  values.isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-brand-dark text-brand-orange mb-6">
                  {coreValueIcons[value.id]}
                </div>
                <h3 className="text-lg font-bold text-brand-dark tracking-tight mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-light text-sm mt-auto">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
