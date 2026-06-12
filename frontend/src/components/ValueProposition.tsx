import { useEffect, useRef, useState } from 'react';

export default function ValueProposition() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger the animation when 20% of the section is visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Pre-Dispatch Verification",
      description: "No more wasted trips. We personally call the recipient to verify coordinates before a package leaves our hub.",
    },
    {
      title: "48h COD Payouts",
      description: "Stop chasing money. Cash collected is audited and remitted directly to your bank account within 48 hours.",
    },
    {
      title: "Partner Dashboard",
      description: "Manage bulk orders, monitor delivery status, and track your payouts through our secure partner portal.",
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-gray-50 w-full relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white hidden lg:block"></div>

      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-20 items-center relative z-10">
        
        {/* Left Side: Image with Slide-in Animation */}
        <div 
          className={`w-full lg:w-1/2 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div className="relative aspect-[4/5] lg:aspect-square w-full shadow-2xl overflow-hidden group">
            <img 
              src="/valuepreposition.jpg" 
              alt="Packton logistics operations" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* The orange accent corner */}
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-brand-orange z-20"></div>
            
            {/* Cool Image Overlay Effect on Hover */}
            <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
          </div>
        </div>

        {/* Right Side: Text and Staggered Features */}
        <div className="w-full lg:w-1/2 lg:py-10 lg:pl-16">
          
          {/* Header with Slide-up Animation */}
          <div 
            className={`mb-16 transform transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-brand-dark tracking-tighter leading-none mb-6">
              Packton — Structured <br /> logistics for Rwanda.
            </h2>
            <p className="text-lg text-gray-500 font-light max-w-lg">
              We move beyond generic delivery services by acting as an extension of your business. Reliable, transparent, and built for scale.
            </p>
          </div>

          {/* Grouped features container */}
          <div 
            className={`bg-white p-8 lg:p-12 border border-gray-100 shadow-sm space-y-12 transform transition-all duration-1000 delay-500 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {features.map((feature, index) => (
              <div 
                key={index} 
                // Delay each feature slightly more than the last for a cascading effect
                style={{ transitionDelay: `${700 + (index * 200)}ms` }}
                className={`flex gap-6 group cursor-default transform transition-all duration-700 ease-out ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
              >
                {/* Icon with Pop Animation */}
                <div className="mt-1">
                  <div className="w-8 h-8 flex items-center justify-center border border-brand-orange text-brand-orange rounded-full group-hover:bg-brand-orange group-hover:text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Text sliding right on hover */}
                <div className="transition-transform duration-300 group-hover:translate-x-2">
                  <h3 className="text-xl font-bold text-brand-dark mb-2 tracking-tight group-hover:text-brand-orange transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed max-w-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}