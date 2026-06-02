export default function QuickFacts() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 lg:px-12 py-24 mb-10">
      
      {/* Left Side: Commitment Copy */}
      <div className="flex flex-col justify-center">
        <p className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-4">Our Commitment</p>
        <h2 className="text-4xl md:text-5xl font-semibold text-brand-dark leading-tight tracking-tight mb-6">
          Built for businesses. <br/> Accessible to everyone.
        </h2>
        <p className="text-brand-dark/70 text-lg leading-relaxed max-w-md">
          We confirm every location before dispatch to eliminate failed deliveries. Your packages arrive safely, and cash collected on your behalf is remitted within 48 hours. 
        </p>
      </div>

      {/* Right Side: Structural Data Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-12">
        <div className="border-l-2 border-brand-orange pl-6">
          <h3 className="text-4xl font-bold text-brand-dark mb-2">500<span className="text-brand-orange">+</span></h3>
          <p className="text-sm font-medium text-brand-dark/60">Deliveries Completed</p>
        </div>
        <div className="border-l-2 border-brand-teal pl-6">
          <h3 className="text-4xl font-bold text-brand-dark mb-2">48<span className="text-brand-orange">h</span></h3>
          <p className="text-sm font-medium text-brand-dark/60">COD Remittance</p>
        </div>
        <div className="border-l-2 border-brand-teal pl-6">
          <h3 className="text-4xl font-bold text-brand-dark mb-2">98<span className="text-brand-orange">%</span></h3>
          <p className="text-sm font-medium text-brand-dark/60">Success Rate</p>
        </div>
        <div className="border-l-2 border-brand-teal pl-6">
          <h3 className="text-4xl font-bold text-brand-dark mb-2">100<span className="text-brand-orange">%</span></h3>
          <p className="text-sm font-medium text-brand-dark/60">Location Verified</p>
        </div>
      </div>
    </div>
  );
}