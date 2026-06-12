import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomeServices() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "B2B Bulk Delivery",
      description: "Upload your client list — we confirm, deliver, and collect cash on delivery. Full dashboard to track every order in real time.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "B2C Individual Parcels",
      description: "Call us, WhatsApp us, or book online. We pick up from your door and deliver anywhere in Rwanda — same day or next day.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Cash On Delivery",
      description: "We collect payment at the door on your behalf and remit to you within 48 hours. No chasing clients — we handle it.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Status Updates",
      description: "Every delivery gets a unique tracking number. Sender and recipient both get SMS updates at every stage — booked to delivered.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Business Dashboard",
      description: "B2B clients get a full portal — upload orders, track deliveries, view COD reports, and export data. All in one place.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Cross-Border Delivery",
      description: "We deliver beyond Rwanda — Uganda, DRC, Burundi, Tanzania. One partner for all your regional logistics needs.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="bg-brand-teal py-24 lg:py-32 w-full overflow-hidden">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <div 
            className={`flex items-center gap-4 mb-4 transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            <p className="text-brand-orange font-bold tracking-[0.15em] uppercase text-sm">
              Our Capabilities
            </p>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6 transform transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Explore our services.
          </h2>
          
          <p 
            className={`text-lg md:text-xl text-white/70 font-light transform transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            From bulk B2B deliveries to urgent individual parcels, we turn logistics challenges into operational efficiency and scalable results.
          </p>
        </div>

        {/* The Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              style={{ transitionDelay: `${300 + (index * 120)}ms` }}
              className={`group relative bg-white/5 border border-white/10 p-8 lg:p-10 flex flex-col justify-between h-full overflow-hidden transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/10 hover:-translate-y-2 hover:scale-[1.02] hover:border-brand-orange/40 hover:shadow-[0_20px_40px_-15px_rgba(232,82,10,0.3)] ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-95"
              }`}
            >
              {/* Premium Glass Shimmer Effect on Hover */}
              <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1200ms] ease-in-out skew-x-12 z-0 pointer-events-none"></div>

              {/* Ambient Glow behind the text on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 via-brand-orange/0 to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <div className="relative z-10">
                {/* Header Row: Icon + Index Number */}
                <div className="flex justify-between items-start mb-8">
                  {/* Icon with Physics */}
                  <div className="w-12 h-12 bg-brand-teal border border-white/10 rounded-lg flex items-center justify-center text-brand-orange transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-[0_0_20px_rgba(232,82,10,0.4)]">
                    {service.icon}
                  </div>
                  {/* Index Number slides down gently on hover */}
                  <span className="text-white/20 font-mono text-sm font-bold transition-all duration-500 ease-out group-hover:text-brand-orange/80 group-hover:translate-y-1">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 tracking-tight transition-colors duration-300 group-hover:text-brand-orange">
                  {service.title}
                </h3>
                
                <p className="text-base text-white/60 leading-relaxed mb-10 transition-colors duration-300 group-hover:text-white/90">
                  {service.description}
                </p>
              </div>

              {/* Packton Arrow Link */}
              <Link 
                to="/services" 
                className="relative z-10 inline-flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest group/link mt-auto w-fit transition-colors duration-300 hover:text-brand-orange"
              >
                Learn More
                <span className="transform transition-transform duration-300 ease-out group-hover/link:translate-x-3 text-brand-orange">→</span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}