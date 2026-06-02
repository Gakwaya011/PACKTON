import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Core Mission (Takes up more space for structural balance) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-orange flex items-center justify-center rounded-full">
                <span className="text-white font-black text-base">P</span>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight uppercase">
                Packton
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mt-2 font-light">
              Frictionless last-mile delivery architecture across Rwanda. Built to optimize high-volume logistics for businesses while keeping on-demand shipping accessible for every individual.
            </p>
            <p className="text-xs text-white/30 font-medium tracking-wide uppercase mt-2">
              A service of BRC Engineering Company Ltd
            </p>
          </div>

          {/* Column 2: Operational Services */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-brand-orange mb-2">Services</h4>
            <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors font-medium">B2B Manifest Shipping</Link>
            <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors font-medium">On-Demand Courier</Link>
            <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Cash on Delivery (COD)</Link>
            <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Regional Distribution</Link>
          </div>

          {/* Column 3: Platform Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white mb-2">Platform</h4>
            <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors font-medium">About Us</Link>
            <Link to="/how-it-works" className="text-sm text-white/60 hover:text-white transition-colors font-medium">How It Works</Link>
            <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Get a Quote</Link>
            <Link to="/login" className="text-sm text-brand-orange font-bold hover:underline transition-all">Login</Link>
          </div>

          {/* Column 4: Main Office Contacts */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white mb-2">Inquiries</h4>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Our dispatch management grid operates straight out of Kigali, coordinating routes nationwide.
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              <a href="mailto:info@packton.com" className="text-sm font-bold text-white hover:text-brand-orange transition-colors">info@packton.com</a>
              <span className="text-sm font-medium text-white/40">Kigali, Rwanda</span>
            </div>
          </div>

        </div>

        {/* Bottom Section: Clean Metadata Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-center sm:text-left">
          <p className="text-xs text-white/40 font-light">
            © {new Date().getFullYear()} <span className="text-white/60 font-semibold">Packton</span> · BRC Engineering Company Ltd · All rights reserved
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 font-semibold tracking-wider uppercase">
            <span>Kigali</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Rwanda 🇷🇼</span>
          </div>
        </div>

      </div>
    </footer>
  );
}