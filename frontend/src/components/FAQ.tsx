import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const { t } = useTranslation('home');
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first one
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Expanded FAQ list with realistic logistics data
  const faqs = t('faq.items', { returnObjects: true }) as FaqItem[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-24 w-full overflow-hidden border-t border-gray-100">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-20 lg:gap-32">
        
        {/* Left Side: Sticky Header — dark panel, matches the Services section for consistency */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <div
            className={`relative overflow-hidden bg-brand-dark rounded-2xl p-8 lg:p-10 transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {/* Soft corner glow — same treatment as the service cards */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-brand-teal/40 rounded-full blur-3xl pointer-events-none z-0"></div>
            {/* Thin top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand-teal via-white/20 to-transparent pointer-events-none z-0"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                <p className="text-white/60 font-medium tracking-wide text-sm">
                  {t('faq.eyebrow')}
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
                {t('faq.headingLine1')} <br className="hidden lg:block" /> {t('faq.headingLine2')}
              </h2>

              <p className="text-white/60 font-light leading-relaxed mb-8">
                {t('faq.paragraph')}
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest group/link transition-colors duration-300 hover:text-brand-orange"
              >
                {t('faq.contactUs')}
                <span className="transform transition-transform duration-300 ease-out group-hover/link:translate-x-3 text-brand-orange">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: The Minimalist Accordion */}
        <div className="w-full lg:w-2/3 flex flex-col mt-4 lg:mt-0 border-t border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                style={{ transitionDelay: `${400 + (index * 120)}ms` }}
                className={`border-b border-gray-200 transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-7 lg:py-8 flex justify-between items-center text-left group focus:outline-none"
                >
                  <h3 className={`text-lg lg:text-xl font-bold tracking-tight pr-8 transform transition-all duration-300 ease-out ${
                    isOpen ? "text-brand-orange" : "text-brand-dark group-hover:text-brand-orange group-hover:translate-x-2"
                  }`}>
                    {faq.q}
                  </h3>
                  
                  {/* The +/- Icon Toggle */}
                  <span className={`flex-shrink-0 text-3xl font-light transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "rotate-45 text-brand-orange scale-110" : "text-gray-400 group-hover:text-brand-orange group-hover:scale-110"
                  }`}>
                    +
                  </span>
                </button>

                {/* Smooth Height Animation Wrapper */}
                <div
                  className={`grid transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-7 lg:pb-8" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* The Answer Text: Slides down and fades in when opened */}
                    <p className={`text-gray-500 font-light text-base lg:text-lg leading-relaxed max-w-3xl transform transition-all duration-[600ms] delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                    }`}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}