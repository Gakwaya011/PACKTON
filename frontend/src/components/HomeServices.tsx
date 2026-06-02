import { Link } from 'react-router-dom';

export default function HomeServices() {
  return (
    <section className="bg-white py-24 px-6 lg:px-12 border-t border-brand-light/20">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 max-w-xl">
          <p className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-3">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight leading-none">
            Tailored Logistics.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Service Box 1: Corporate/B2B */}
          <div className="bg-brand-ultra p-10 md:p-12 rounded-3xl border border-brand-light/10 flex flex-col justify-between items-start transition-all hover:border-brand-teal">
            <div>
              <div className="w-12 h-12 bg-brand-teal text-white flex items-center justify-center rounded-xl font-bold text-xl mb-6">🏢</div>
              <h3 className="text-2xl font-bold text-brand-dark uppercase tracking-tight mb-4">Enterprise & B2B Solutions</h3>
              <p className="text-brand-dark/70 leading-relaxed mb-8">
                Built for multi-order merchants and e-commerce platforms. Upload daily delivery manifests in bulk, track high-volume distributions via our secure client portal, and secure steady cash-on-delivery flows.
              </p>
            </div>
            <Link to="/services" className="font-bold text-sm text-brand-teal uppercase tracking-wider group flex items-center gap-2">
              Corporate Rates <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Service Box 2: Individuals */}
          <div className="bg-brand-ultra p-10 md:p-12 rounded-3xl border border-brand-light/10 flex flex-col justify-between items-start transition-all hover:border-brand-orange">
            <div>
              <div className="w-12 h-12 bg-brand-orange text-white flex items-center justify-center rounded-xl font-bold text-xl mb-6">📦</div>
              <h3 className="text-2xl font-bold text-brand-dark uppercase tracking-tight mb-4">On-Demand Individual Courier</h3>
              <p className="text-brand-dark/70 leading-relaxed mb-8">
                Perfect for personal parcels, urgent paperwork, or one-off marketplace sales across Kigali and beyond. Simply request a dispatch rider, get transparent instant pricing, and rest assured your item travels safely.
              </p>
            </div>
            <Link to="/services" className="font-bold text-sm text-brand-orange uppercase tracking-wider group flex items-center gap-2">
              Book a Rider <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}