import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // We hide the standard nav on the login page to keep it distraction-free
  if (location.pathname === '/login') {
    return (
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-center z-50">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-orange flex items-center justify-center rounded-lg shadow-sm">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <span className="font-extrabold text-2xl text-brand-dark tracking-tight uppercase">Packton</span>
        </Link>
      </nav>
    );
  }

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-7xl bg-white/90 backdrop-blur-md border border-brand-light/20 shadow-lg rounded-full px-4 py-3 transition-all duration-300">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 pl-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-9 h-9 bg-brand-orange flex items-center justify-center rounded-full shadow-md">
            <span className="text-white font-black text-lg">P</span>
          </div>
          <span className="font-extrabold text-lg text-brand-dark tracking-tight uppercase">
            Packton
          </span>
        </Link>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'How it works', path: '/how-it-works' },
            { name: 'Contact', path: '/contact' },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
                isActive(item.path)
                  ? 'text-brand-teal bg-brand-teal/5'
                  : 'text-brand-dark/60 hover:text-brand-teal hover:bg-brand-ultra'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: CTA & Login */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange px-4">
            Login
          </Link>
          <Link to="/contact" className="bg-brand-orange text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:bg-brand-teal transition-colors">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden p-2 text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-brand-light/20 p-4 flex flex-col gap-2 lg:hidden">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'How it works', path: '/how-it-works' },
              { name: 'Contact', path: '/contact' },
              { name: 'Login to Portal', path: '/login' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-xl ${
                  isActive(item.path) ? 'bg-brand-orange/10 text-brand-orange' : 'text-brand-dark hover:bg-brand-ultra'
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