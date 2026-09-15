import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
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

  const steps = [
    {
      step: "Step 01",
      title: "Book & Upload",
      description: "Individuals book instantly online. Businesses upload their daily manifest via our secure B2B portal or API."
    },
    {
      step: "Step 02",
      title: "We Confirm",
      description: "Our dispatch team calls every recipient to verify location and availability before a rider ever leaves the hub."
    },
    {
      step: "Step 03",
      title: "Deliver & Remit",
      description: "Your package arrives safely. Cash on delivery is collected and remitted to your account within 48 hours."
    }
  ];

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-24 w-full overflow-hidden border-t border-gray-100">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10">

        {/* Header */}
        <div
          className={`mb-20 lg:mb-28 max-w-2xl transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-brand-orange"></div>
            <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
              Our Process
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter leading-[1.1] mb-6">
            How we deliver.
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
            Simple, transparent, and built on our core promise: we confirm before we move.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">

          {/* Connecting line (desktop only) */}
          <div
            className={`hidden md:block absolute top-7 left-0 right-0 h-px bg-gray-200 transform transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
          ></div>

          {steps.map((item, index) => (
            <div
              key={item.step}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
              className={`group relative flex flex-col transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
            >
              {/* Step marker */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-brand-dark flex items-center justify-center mb-8 transition-all duration-500 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:shadow-[0_0_25px_rgba(232,82,10,0.4)] group-hover:scale-110">
                <span className="text-brand-dark font-black text-lg transition-colors duration-500 group-hover:text-white">
                  {index + 1}
                </span>
              </div>

              <p className="text-brand-orange font-mono text-xs font-bold tracking-widest uppercase mb-3">
                {item.step}
              </p>
              <h3 className="text-xl lg:text-2xl font-bold text-brand-dark tracking-tight mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-light max-w-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
