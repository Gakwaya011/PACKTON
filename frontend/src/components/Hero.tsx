import { useState } from 'react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'track' | 'estimate'>('track');

  return (
    <div className="w-full min-h-[85vh] bg-white grid grid-cols-1 lg:grid-cols-12 items-stretch">
      
      {/* Left Column: High-Contrast Functional Space */}
      <div className="lg:col-span-6 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 bg-brand-ultra">
        <div className="max-w-xl w-full mx-auto lg:mx-0">
          
          <div className="mb-6 flex items-center gap-3 text-brand-orange text-xs font-black uppercase tracking-[0.25em]">
            <span className="w-8 h-[2px] bg-brand-orange"></span>
            Verified Transport Pipeline
          </div>

          <h1 className="text-brand-dark text-5xl md:text-6xl font-black leading-none tracking-tighter mb-6 uppercase">
            Pack it. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-teal">We Go.</span>
          </h1>
          
          <p className="text-brand-dark/70 text-base md:text-lg mb-10 font-medium leading-relaxed">
            Dependable delivery mapping across Rwanda. From bulk business manifests to individual point-to-point courier runs, we verify recipient availability to ensure zero failed dispatches.
          </p>

          {/* Interactive Workspace Console */}
          <div className="w-full bg-brand-teal p-2 rounded-2xl shadow-xl border border-brand-teal/10">
            <div className="flex gap-1 mb-2 bg-black/20 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('track')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'track' ? 'bg-brand-orange text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
              >
                Track Shipment
              </button>
              <button 
                onClick={() => setActiveTab('estimate')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'estimate' ? 'bg-brand-orange text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
              >
                Estimate Cost
              </button>
            </div>

            {activeTab === 'track' && (
              <div className="flex flex-col sm:flex-row gap-2 p-1">
                <input 
                  type="text" 
                  placeholder="Enter Tracking ID..." 
                  className="flex-grow bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-bold placeholder-white/40 text-sm outline-none focus:border-brand-orange transition-colors"
                />
                <button className="bg-white hover:bg-brand-orange hover:text-white text-brand-dark px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shrink-0">
                  Locate
                </button>
              </div>
            )}

            {activeTab === 'estimate' && (
              <div className="flex flex-col gap-2 p-1">
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="From (e.g., Kacyiru)" className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold placeholder-white/40 text-sm outline-none" />
                  <input type="text" placeholder="To (e.g., Gisenyi)" className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold placeholder-white/40 text-sm outline-none" />
                </div>
                <button className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors">
                  Calculate Route
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Right Column: Full-Bleed Production Image */}
      <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-auto">
        <img 
          src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1600" 
          alt="Packton logistics network" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle overlay shading back into the left workspace column */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ultra/10 via-transparent to-transparent hidden lg:block"></div>
      </div>

    </div>
  );
}