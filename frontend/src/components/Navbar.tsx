import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  // Trigger the drop-in animation exactly when the component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomePage && !isScrolled;

  if (location.pathname === '/login') {
    return (
      <nav className="absolute top-0 left-0 right-0 p-8 flex justify-center z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-orange flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <span className="font-black text-2xl text-brand-dark tracking-tighter uppercase transition-colors group-hover:text-brand-orange">Packton</span>
        </Link>
      </nav>
    );
  }

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-[800ms] ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isTransparent 
          ? 'bg-transparent border-b border-white/10 py-6' 
          : 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-gray-100'
      }`}
    >
      <nav className="w-full max-w-[1760px] mx-auto px-6 lg:px-8 xl:px-10 flex items-center justify-between transition-all duration-300">
        
        {/* Left: Logo (With Hover Scale) */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-9 h-9 bg-brand-orange flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="text-white font-black text-lg">P</span>
          </div>
          <span 
            className={`font-black text-xl tracking-tighter uppercase transition-colors duration-300 ${
              isTransparent ? 'text-white drop-shadow-md group-hover:text-brand-orange' : 'text-brand-dark group-hover:text-brand-orange'
            }`}
          >
            Packton
          </span>
        </Link>

        {/* Center & Right Links Container */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          
          {/* Desktop Links (With Expanding Underlines) */}
          <div className="flex items-center gap-6 xl:gap-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'How it works', path: '/how-it-works' },
              { name: 'Blog', path: '/blog' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-brand-orange'
                    : isTransparent 
                      ? 'text-white/80 hover:text-white' 
                      : 'text-brand-dark/70 hover:text-brand-dark'
                }`}
              >
                {item.name}
                {/* The Animated Underline */}
                <span 
                  className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-300 ease-out bg-brand-orange ${
                    isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right: CTA & Login (With Button Lift) */}
          <div className="flex items-center gap-5 xl:gap-6 border-l pl-6 xl:pl-8 border-white/20 transition-colors duration-300">
            <Link 
              to="/login" 
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:text-brand-orange ${
                isTransparent ? 'text-white' : 'text-brand-dark'
              }`}
            >
              Login
            </Link>
            <Link 
              to="/contact" 
              className="bg-brand-orange text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/30"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={`lg:hidden p-2 transition-transform duration-300 hover:scale-110 ${
            isTransparent ? 'text-white' : 'text-brand-dark'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className={`w-7 h-7 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xl p-6 flex flex-col gap-2 lg:hidden z-50 animate-[slideDown_0.3s_ease-out]">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'How it works', path: '/how-it-works' },
              { name: 'Blog', path: '/blog' },
              { name: 'Contact', path: '/contact' },
              { name: 'Login to Portal', path: '/login' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'bg-brand-orange/10 text-brand-orange translate-x-2' 
                    : 'text-brand-dark/80 hover:bg-gray-50 hover:text-brand-orange hover:translate-x-2'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}