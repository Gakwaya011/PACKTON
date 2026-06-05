import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 lg:px-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Core Mission */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-orange flex items-center justify-center rounded-xl transition-transform group-hover:scale-105 shadow-lg shadow-brand-orange/20">
                <span className="text-white font-black text-lg">P</span>
              </div>
              <span className="font-black text-2xl text-white tracking-tighter uppercase">
                Packton
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed font-light pr-4">
              Frictionless last-mile delivery architecture across Rwanda. Built to optimize high-volume logistics for businesses while keeping on-demand shipping accessible for every individual.
            </p>
            <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
              A service of BRC Engineering Company Ltd
            </p>
          </div>

          {/* Spacer for structural balance on large screens */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Column 2: Operational Services */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white/40 mb-1">Services</h4>
            <Link to="/services" className="text-sm text-white/80 hover:text-brand-orange transition-colors font-medium">B2B Manifest Shipping</Link>
            <Link to="/services" className="text-sm text-white/80 hover:text-brand-orange transition-colors font-medium">On-Demand Courier</Link>
            <Link to="/services" className="text-sm text-white/80 hover:text-brand-orange transition-colors font-medium">Cash on Delivery (COD)</Link>
            <Link to="/services" className="text-sm text-white/80 hover:text-brand-orange transition-colors font-medium">Regional Distribution</Link>
          </div>

          {/* Column 3: Platform Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white/40 mb-1">Platform</h4>
            <Link to="/about" className="text-sm text-white/80 hover:text-brand-orange transition-colors font-medium">About Us</Link>
            <Link to="/how-it-works" className="text-sm text-white/80 hover:text-brand-orange transition-colors font-medium">How It Works</Link>
            <Link to="/contact" className="text-sm text-white/80 hover:text-brand-orange transition-colors font-medium">Get a Quote</Link>
            <Link to="/login" className="text-sm text-brand-orange font-bold hover:text-white transition-colors">Login</Link>
          </div>

          {/* Column 4: Main Office Contacts */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white/40 mb-1">Inquiries</h4>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Our dispatch management grid operates straight out of Kigali, coordinating routes nationwide.
            </p>
            <div className="mt-1 flex flex-col gap-2">
              <a href="mailto:info@packton.com" className="text-sm font-bold text-white hover:text-brand-orange transition-colors">info@packton.com</a>
              <div className="flex items-center gap-2 text-sm font-medium text-white/40">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Kigali, Rwanda
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Clean Metadata Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-center sm:text-left">
          <p className="text-xs text-white/40 font-light">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Packton</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 font-bold tracking-widest uppercase">
            <span>System Status</span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Online
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}