export default function Hero() {
  return (
    <section className="min-h-screen pt-[72px] grid grid-cols-1 md:grid-cols-2 bg-brand-dark relative overflow-hidden">
      {/* Left Content Area */}
      <div className="flex flex-col justify-center px-[8%] py-20 z-10">
        <p className="text-brand-orange text-xs font-semibold tracking-[4px] uppercase mb-5">
          Kigali · Upcountry · Cross-border
        </p>
        
        <h1 className="text-white text-6xl md:text-8xl font-extrabold uppercase leading-none tracking-tight mb-6">
          Pack it.<br />
          <span className="text-brand-orange">We Go.</span>
        </h1>
        
        <p className="text-white/70 font-light text-lg max-w-[400px] leading-relaxed mb-10">
          Rwanda's most reliable courier service — for businesses managing hundreds of deliveries and individuals sending a single parcel.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a href="#calculator" className="bg-brand-orange text-white px-8 py-4 font-bold text-sm tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-lg transition-all">
            Get a price
          </a>
          <a href="#services" className="bg-transparent text-white border-2 border-white/30 px-8 py-4 font-bold text-sm tracking-wider uppercase hover:border-brand-orange hover:text-brand-orange transition-colors">
            Our services
          </a>
        </div>

        {/* Hero Stats */}
        <div className="flex gap-10 mt-12 pt-8 border-t border-white/10">
          <div>
            <div className="text-brand-orange text-3xl font-extrabold">500+</div>
            <div className="text-white/50 text-xs uppercase tracking-wider mt-1">Deliveries done</div>
          </div>
          <div>
            <div className="text-brand-orange text-3xl font-extrabold">48h</div>
            <div className="text-white/50 text-xs uppercase tracking-wider mt-1">COD remittance</div>
          </div>
          <div>
            <div className="text-brand-orange text-3xl font-extrabold">98%</div>
            <div className="text-white/50 text-xs uppercase tracking-wider mt-1">Success rate</div>
          </div>
        </div>
      </div>

      {/* Right Illustration Area (Placeholder for now) */}
      <div className="hidden md:flex bg-brand-ultra items-center justify-center p-20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-brand-dark" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}></div>
        <div className="w-[420px] h-[380px] bg-white rounded-lg shadow-2xl border-t-4 border-brand-orange flex items-center justify-center flex-col gap-4">
           {/* We can drop the SVG illustration from the HTML here later */}
           <div className="text-brand-dark/20 font-bold text-xl uppercase tracking-widest">Illustration Area</div>
        </div>
      </div>
    </section>
  );
}