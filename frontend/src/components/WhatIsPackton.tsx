export default function WhatIsPackton() {
  return (
    <section className="bg-white py-24 px-6 lg:px-12 text-center border-b border-brand-light/10">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-6">
          <span className="text-brand-orange">Packton</span> — All your delivery needs in one place
        </h2>
        
        <p className="text-lg md:text-xl text-brand-dark/70 font-light leading-relaxed max-w-3xl mx-auto mb-16">
          Every day, businesses and individuals struggle with unreliable delivery riders, lost packages, and delayed payments. To fix this, we built Packton—a structured logistics network that verifies every location before dispatch and ensures Cash on Delivery (COD) is remitted to your bank within 48 hours.
        </p>

        {/* Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-ultra rounded-full flex items-center justify-center mb-4 border border-brand-light/20 shadow-sm">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">Location Verified</h3>
            <p className="text-sm text-brand-dark/60 font-light">We call the recipient before moving, eliminating wasted trips.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-ultra rounded-full flex items-center justify-center mb-4 border border-brand-light/20 shadow-sm">
              <span className="text-2xl">💸</span>
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">48h COD Payouts</h3>
            <p className="text-sm text-brand-dark/60 font-light">Money collected on delivery is sent directly to your account fast.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-ultra rounded-full flex items-center justify-center mb-4 border border-brand-light/20 shadow-sm">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-2">Live Updates</h3>
            <p className="text-sm text-brand-dark/60 font-light">Receive SMS notifications so you always know where your parcel is.</p>
          </div>
        </div>

      </div>
    </section>
  );
}