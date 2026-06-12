import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBackgroundImage from '../assets/hero-bg.jpg';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // A tiny 100ms delay ensures the browser paints the initial invisible state 
    // before triggering the animations, making them buttery smooth.
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* LAYER 1: The Background Image with Cinematic "Ken Burns" Effect */}
      <img 
        src={heroBackgroundImage} 
        alt="Packton logistics dispatch" 
        className={`absolute inset-0 w-full h-full object-cover object-center z-0 transform transition-all duration-[3000ms] ease-out ${
          isLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      />
      
      {/* LAYER 2: The Gradients (Animated to fade in smoothly) */}
      <div className={`absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-0 hidden md:block transition-opacity duration-[2000ms] ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}></div>
      <div className={`absolute inset-0 bg-[#1A1A1A]/70 md:hidden z-0 transition-opacity duration-[2000ms] ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}></div>

      {/* LAYER 3: The Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-32 pb-20">
        
        <div className="max-w-3xl">
          
          {/* Location Indicator - Drops in from above */}
          <div 
            className={`mb-6 flex items-center gap-2 text-white/60 text-sm font-medium drop-shadow-md transform transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            <svg className="w-4 h-4 animate-pulse text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Operating in Kigali & Nationwide
          </div>

          {/* Headline - Staggered slide up */}
          <h1 className="text-white text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.1] tracking-tight mb-8 drop-shadow-lg flex flex-col">
            <span 
              className={`transform transition-all duration-1000 delay-500 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              We deliver your packages
            </span>
            <span 
              className={`text-brand-orange mt-2 transform transition-all duration-1000 delay-700 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              safely and on time.
            </span>
          </h1>
          
          {/* Paragraph - Slides up after headline */}
          <p 
            className={`text-white/90 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-xl drop-shadow-md transform transition-all duration-1000 delay-[900ms] ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Packton connects Rwanda through fast, reliable last-mile delivery. Whether you are a business sending hundreds of daily orders or an individual sending a gift, we make sure it gets there.
          </p>

          {/* Buttons - Pop in last with hover micro-interactions */}
          <div 
            className={`flex flex-wrap items-center gap-4 transform transition-all duration-1000 delay-[1100ms] ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <Link 
              to="/contact" 
              className="bg-brand-orange text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(247,105,37,0.3)] hover:shadow-[0_0_30px_rgba(247,105,37,0.6)] hover:bg-orange-600 hover:-translate-y-1"
            >
              Partner with us
            </Link>
            
            <Link 
              to="/services" 
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:bg-white hover:text-black hover:-translate-y-1"
            >
              Explore our services
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}