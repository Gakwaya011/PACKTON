import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Helper to highlight active page links
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-light/20 px-[6%] h-[80px] flex items-center justify-between shadow-xs">
      {/* Premium Logo Layout */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-orange flex items-center justify-center rounded-lg shadow-sm">
          <span className="text-white font-black text-xl tracking-tighter">P</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-xl text-brand-dark tracking-tight uppercase">Packton</span>
          <span className="text-[9px] font-semibold text-brand-light tracking-widest uppercase">Logistics Platform</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-8">
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          <li>
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-brand-orange font-semibold' : 'text-brand-dark/70 hover:text-brand-orange'}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-brand-orange font-semibold' : 'text-brand-dark/70 hover:text-brand-orange'}`}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" className={`text-sm font-medium transition-colors ${isActive('/services') ? 'text-brand-orange font-semibold' : 'text-brand-dark/70 hover:text-brand-orange'}`}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className={`text-sm font-medium transition-colors ${isActive('/how-it-works') ? 'text-brand-orange font-semibold' : 'text-brand-dark/70 hover:text-brand-orange'}`}>
              How It Works
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-brand-orange font-semibold' : 'text-brand-dark/70 hover:text-brand-orange'}`}>
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Divider Line */}
        <span className="h-5 w-px bg-brand-light/30"></span>

        {/* High-impact Portal Entry */}
        <Link to="/login" className="bg-brand-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-orange transition-all shadow-md hover:shadow-lg">
          Client Portal
        </Link>
      </div>
    </nav>
  );
}