import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-24 lg:pt-32 pb-10 w-full overflow-hidden border-t border-white/5">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10">
        
        {/* Top Section: The Mega CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24 lg:mb-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-brand-orange"></div>
              <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">
                Ready to scale?
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-6">
              Move faster. <br />
              <span className="text-white/40">Scale smarter.</span>
            </h2>
            <p className="text-xl text-white/60 font-light leading-relaxed">
              Partner with Packton to build a frictionless, high-volume delivery pipeline across Rwanda and beyond.
            </p>
          </div>
          
          <Link 
            to="/contact" 
            className="group relative inline-flex items-center justify-center px-8 py-5 lg:px-10 lg:py-6 bg-brand-orange text-white font-black uppercase tracking-[0.15em] text-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(232,82,10,0.4)] flex-shrink-0"
          >
             <span className="relative z-10 flex items-center gap-3">
               Start Shipping 
               <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
             </span>
             {/* Hover highlight sweep */}
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
          </Link>
        </div>

        {/* Middle Section: Structural Link Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Core Mission */}
          <div className="lg:col-span-4 flex flex-col items-start gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-brand-orange flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-brand-orange/20">
                <span className="text-white font-black text-xl">P</span>
              </div>
              <span className="font-black text-3xl text-white tracking-tighter uppercase transition-colors group-hover:text-brand-orange">
                Packton
              </span>
            </Link>
            <p className="text-base text-white/50 leading-relaxed font-light pr-4 max-w-sm">
              Frictionless last-mile delivery architecture. Built to optimize high-volume logistics for businesses while keeping on-demand shipping accessible for everyone.
            </p>
          </div>

          {/* Spacer for structural balance */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Column 2: Operational Services */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-brand-light mb-2">Services</h4>
            {[
              { name: 'B2B Manifest Shipping', path: '/services' },
              { name: 'On-Demand Courier', path: '/services' },
              { name: 'Cash on Delivery (COD)', path: '/services' },
              { name: 'Regional Distribution', path: '/services' }
            ].map((link) => (
              <Link key={link.name} to={link.path} className="group flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <span className="w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-4"></span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Column 3: Platform Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-brand-light mb-2">Platform</h4>
            {[
              { name: 'About Us', path: '/about' },
              { name: 'How It Works', path: '/how-it-works' },
              { name: 'Get a Quote', path: '/contact' },
            ].map((link) => (
              <Link key={link.name} to={link.path} className="group flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <span className="w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-4"></span>
                {link.name}
              </Link>
            ))}
            {/* Special Login Link */}
            <Link to="/login" className="group flex items-center gap-3 text-sm text-brand-orange font-bold hover:text-white transition-colors mt-2">
              Client Login <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Column 4: Main Office Contacts */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-brand-light mb-2">Command Center</h4>
            <p className="text-sm text-white/50 font-light leading-relaxed mb-2">
              Our dispatch management grid operates straight out of Kigali, coordinating routes nationwide.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:info@packton.com" className="group inline-flex items-center gap-3 text-lg font-bold text-white hover:text-brand-orange transition-colors">
                info@packton.com
              </a>
              <div className="flex items-center gap-3 text-sm font-medium text-white/40">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Kigali, Rwanda
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Clean Copyright */}
        <div className="pt-8 text-center sm:text-left">
          <p className="text-xs text-white/40 font-light tracking-wide">
            © {new Date().getFullYear()} <span className="text-white font-bold tracking-wider uppercase">Packton</span>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}