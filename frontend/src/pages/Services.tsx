import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "01",
      title: "B2B Bulk Manifests",
      shortDesc: "High-volume, automated routing for enterprise merchants.",
      description: "Stop manually entering orders. Upload your daily dispatch manifest via CSV or API, and our system automatically routes, batches, and assigns the deliveries to our urban fleet. Designed for e-commerce platforms, distributors, and corporate partners who need to move hundreds of parcels a day without friction.",
      specs: [
        { label: "Integration", value: "REST API & CSV" },
        { label: "Batching", value: "Algorithmic Routing" },
        { label: "Support", value: "Dedicated Account Mgr" }
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: "02",
      title: "On-Demand Courier",
      shortDesc: "Hyper-fast, single-parcel dispatch across Kigali.",
      description: "When it has to be there right now. Request a rider instantly through our web platform or WhatsApp. We guarantee rapid pickup and direct door-to-door delivery with zero warehouse layovers. Perfect for urgent documents, retail single-orders, and emergency parts logistics.",
      specs: [
        { label: "SLA Time", value: "2 - 4 Hours" },
        { label: "Tracking", value: "Live GPS Link" },
        { label: "Pricing", value: "Instant Quoting" }
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: "03",
      title: "COD Management",
      shortDesc: "Secure, audited cash collection and remittance.",
      description: "Cash on Delivery is the lifeblood of local commerce, but chasing payments slows you down. We secure your funds at the exact moment of drop-off. Our riders digitally log the collection, and our treasury department remits the full amount directly to your verified bank or mobile money account within 48 hours.",
      specs: [
        { label: "Remittance", value: "48h Guarantee" },
        { label: "Audit", value: "Digital Ledger" },
        { label: "Payouts", value: "Bank & MoMo" }
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      id: "04",
      title: "Regional Logistics",
      shortDesc: "Linehaul transport beyond the city limits.",
      description: "Expand your market reach without building your own fleet. We execute structured transport runs to major provincial hubs upcountry and coordinate highly secure cross-border logistics into neighboring markets like the DRC and Uganda.",
      specs: [
        { label: "Network", value: "National & Borders" },
        { label: "Assets", value: "Vans & Light Trucks" },
        { label: "Customs", value: "Handoff Support" }
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-white font-sans">
      
      {/* 1. DARK ARCHITECTURAL HERO */}
      <section className="bg-[#1A1A1A] pt-40 pb-32 lg:pt-56 lg:pb-48 px-6 lg:px-12 relative border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1760px] mx-auto px-6 lg:px-12">
           <div className="w-px h-full bg-white/5"></div>
           <div className="w-full h-full flex justify-between">
              <div className="w-px h-full bg-white/5 ml-[33%]"></div>
              <div className="w-px h-full bg-white/5 mr-[33%] hidden lg:block"></div>
           </div>
           <div className="w-px h-full bg-white/5"></div>
        </div>

        <div className="max-w-[1760px] mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[2px] bg-[#E8520A]"></div>
            <p className="text-[#E8520A] font-bold tracking-[0.2em] uppercase text-xs">
              Operational Capabilities
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[96px] font-black tracking-tighter leading-[1.05] mb-12">
            <span className="text-white block mb-2">End-to-end</span>
            <span className="text-white/30 block">delivery architecture.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl leading-relaxed">
            From single-parcel urgent dispatches to high-volume API-driven routing. Explore the physical and digital services we deploy to scale your business.
          </p>
        </div>
      </section>

      {/* 2. THE SERVICES STACK (Sticky Left, Data Right) */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-[1760px] mx-auto">
          
          <div className="flex flex-col gap-0 border-t border-gray-200">
            {services.map((service) => (
              <div key={service.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-16 lg:py-24 border-b border-gray-200 group">
                
                {/* Left Side: Sticky ID & Title */}
                <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 h-fit">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-200 text-brand-dark flex items-center justify-center mb-8 group-hover:bg-[#E8520A] group-hover:text-white group-hover:border-[#E8520A] transition-all duration-500">
                    {service.icon}
                  </div>
                  <span className="text-gray-300 font-mono text-xl font-bold mb-4 block group-hover:text-[#E8520A] transition-colors duration-300">
                    {service.id} //
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter leading-[1.1] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-[#E8520A] font-bold tracking-wide">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Right Side: Description & Spec Grid */}
                <div className="lg:col-span-7 flex flex-col lg:pl-16">
                  <p className="text-xl lg:text-2xl text-gray-500 font-light leading-relaxed mb-12">
                    {service.description}
                  </p>

                  {/* Informational Density: The Spec Box */}
                  <div className="bg-gray-50 border border-gray-200 p-8 lg:p-10 w-full mt-auto">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Service Specifications</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {service.specs.map((spec, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <span className="font-mono text-xs text-brand-dark font-bold uppercase tracking-widest">{spec.label}</span>
                          <span className="text-gray-500 font-light text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Internal CTA */}
                  <div className="mt-10">
                    <Link to="/contact" className="inline-flex items-center gap-3 text-sm font-bold text-brand-dark uppercase tracking-widest group/link hover:text-[#E8520A] transition-colors">
                      Deploy this service
                      <span className="transform transition-transform duration-300 group-hover/link:translate-x-2 text-[#E8520A]">→</span>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. LIGHT BOTTOM CTA */}
      <section className="bg-gray-50 py-32 px-6 lg:px-12 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center mb-8">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tighter mb-8">
            Not sure which tier fits?
          </h2>
          <p className="text-xl text-gray-500 font-light mb-12">
            Let our operations team audit your current shipping volume and build a custom pricing model that scales with you.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#E8520A] text-white font-black uppercase tracking-[0.15em] text-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#E8520A]/30"
          >
            Contact Sales
            <span className="transform transition-transform duration-300">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}