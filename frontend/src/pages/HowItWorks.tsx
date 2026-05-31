export default function HowItWorks() {
  return (
    <div className="pt-28 min-h-screen bg-brand-white px-[6%] pb-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4 uppercase tracking-tight">
          How We Deliver
        </h1>
        <p className="text-brand-light text-lg">
          Simple, transparent, and built on our core promise: we confirm before we move.
        </p>
      </div>

      {/* Grid for Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-light/20 hover:border-brand-orange transition-colors">
          <div className="text-6xl font-black text-brand-orange/10 mb-4">01</div>
          <h3 className="text-xl font-bold text-brand-dark uppercase mb-3">Book & Upload</h3>
          <p className="text-brand-mid text-sm leading-relaxed">
            Individuals can book instantly. Businesses upload their daily manifest via our secure B2B portal.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-light/20 hover:border-brand-orange transition-colors">
          <div className="text-6xl font-black text-brand-orange/10 mb-4">02</div>
          <h3 className="text-xl font-bold text-brand-dark uppercase mb-3">We Confirm</h3>
          <p className="text-brand-mid text-sm leading-relaxed">
            Our dispatch team contacts every recipient to verify location and availability, eliminating failed deliveries.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-light/20 hover:border-brand-orange transition-colors">
          <div className="text-6xl font-black text-brand-orange/10 mb-4">03</div>
          <h3 className="text-xl font-bold text-brand-dark uppercase mb-3">Deliver & Remit</h3>
          <p className="text-brand-mid text-sm leading-relaxed">
            Packages arrive safely. Cash on Delivery is collected and remitted to your account within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}