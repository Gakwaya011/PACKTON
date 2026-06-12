import { useEffect, useRef, useState } from 'react';

// Custom component to handle the smooth number counting
const StatItem = ({ endValue, suffix, label, delay, isVisible }: { endValue: number, suffix: string, label: string, delay: number, isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;
    const duration = 2000; // 2 seconds to count up
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      // Ease-out expo function for that premium "slows down at the end" feel
      const easeProgress = progress / duration;
      const easeOut = easeProgress >= 1 ? 1 : 1 - Math.pow(2, -10 * easeProgress);

      if (progress < duration) {
        setCount(Math.min(Math.ceil(endValue * easeOut), endValue));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    // Wait for the staggered drop-in delay before starting the count
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [endValue, isVisible, delay]);

  return (
    <div 
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative group pl-8 py-2 transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      {/* Static background border */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-light/20"></div>
      
      {/* Animated active border on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
      
      {/* Massive Data Point with Counting State */}
      <h3 className="text-6xl md:text-7xl font-black text-brand-dark tracking-tighter mb-2 flex items-baseline gap-1 transition-transform duration-500 group-hover:-translate-y-1">
        {count}
        <span className="text-4xl md:text-5xl text-brand-orange">{suffix}</span>
      </h3>
      
      {/* Technical Label */}
      <p className="text-sm font-bold uppercase tracking-widest text-brand-light group-hover:text-brand-dark transition-colors duration-300">
        {label}
      </p>
    </div>
  );
};

export default function QuickFacts() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 500, suffix: "+", label: "Deliveries Completed" },
    { value: 48, suffix: "h", label: "COD Remittance" },
    { value: 98, suffix: "%", label: "Success Rate" },
    { value: 100, suffix: "%", label: "Location Verified" }
  ];

  return (
    <section ref={sectionRef} className="w-full bg-brand-ultra py-32 overflow-hidden border-t border-gray-200">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-center">
        
        {/* Left Side: Commitment Copy */}
        <div className="flex flex-col justify-center">
          <div 
            className={`flex items-center gap-4 mb-6 transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="w-10 h-[2px] bg-brand-orange"></div>
            <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
              Our Commitment
            </p>
          </div>

          <h2 
            className={`text-5xl md:text-6xl lg:text-7xl font-black text-brand-dark leading-[1.05] tracking-tighter mb-8 transform transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Built for business. <br/> 
            <span className="text-brand-light">Accessible to all.</span>
          </h2>

          <p 
            className={`text-brand-dark/70 text-lg md:text-xl font-light leading-relaxed max-w-lg transform transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            We confirm every location before dispatch to eliminate failed deliveries. Your packages arrive safely, and cash collected on your behalf is remitted directly to you within 48 hours.
          </p>
        </div>

        {/* Right Side: Structural Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:pl-10">
          {stats.map((stat, index) => (
            <StatItem 
              key={index}
              endValue={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={400 + (index * 150)}
              isVisible={isVisible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}