import { Link } from 'react-router-dom';
import heroBackgroundImage from '../assets/hero-bg.jpg';

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* LAYER 1: The Background Image */}
      <img 
        src={heroBackgroundImage} 
        alt="Packton logistics dispatch" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      
      {/* LAYER 2: The Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-0 hidden md:block"></div>
      <div className="absolute inset-0 bg-[#1A1A1A]/70 md:hidden z-0"></div>

      {/* LAYER 3: The Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-32 pb-20">
        
        <div className="max-w-3xl">
          
          {/* 
            THE NEW ALTERNATIVE DESIGN:
            A highly functional, muted location indicator. No colored dashes, no screaming uppercase letters.
            Just a clean, industrial data point.
          */}
          <div className="mb-6 flex items-center gap-2 text-white/60 text-sm font-medium drop-shadow-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Operating in Kigali & Nationwide
          </div>

          <h1 className="text-white text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.1] tracking-tight mb-8 drop-shadow-lg">
            We deliver your packages
            <span className="block mt-2 text-brand-orange">
              safely and on time.
            </span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-xl drop-shadow-md">
            Packton connects Rwanda through fast, reliable last-mile delivery. Whether you are a business sending hundreds of daily orders or an individual sending a gift, we make sure it gets there.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/contact" 
              className="bg-brand-orange text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg"
            >
              Partner with us
            </Link>
            
            <Link 
              to="/services" 
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white transition-all shadow-lg"
            >
              Explore our services
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}