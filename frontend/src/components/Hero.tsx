import { useState } from 'react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'track' | 'estimate'>('track');

  return (
    <div className="relative w-full rounded-[2.5rem] bg-brand-teal shadow-2xl overflow-hidden min-h-[85vh] flex items-center">
      
      {/* Background Graphic Architecture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-25 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal via-brand-teal/95 to-black/40 pointer-events-none"></div>

      {/* Main Structural Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Hand: High-Impact Copy & Active Console */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          <div className="mb-6 flex items-center gap-3 text-brand-orange text-xs font-black uppercase tracking-[0.25em]">
            <span className="w-8 h-[2px] bg-brand-orange"></span>
            Every Parcel Verified
          </div>

          <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.02] tracking-tighter mb-6 uppercase">
            Pack it. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">We Go.</span>
          </h1>
          
          <p className="text-white/80 text-base md:text-lg max-w-xl mb-10 font-normal leading-relaxed">
            The dependable delivery pipeline for Rwanda. Whether you are scaling daily bulk orders for business or sending a single parcel across town, we confirm the recipient first to guarantee completion.
          </p>

          {/* THE LOGISTICS CONSOLE */}
          <div className="w-full max-w-xl bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            
            {/* Console Toggles */}
            <div className="flex gap-1 mb-2 bg-white/5 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('track')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'track' ? 'bg-brand-orange text-white shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                Track Live Shipment
              </button>
              <button 
                onClick={() => setActiveTab('estimate')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'estimate' ? 'bg-brand-orange text-white shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                Estimate Cost
              </button>
            </div>

            {/* Tab 1: Live Tracking Input */}
            {activeTab === 'track' && (
              <div className="flex flex-col sm:flex-row gap-2 p-1.5">
                <input 
                  type="text" 
                  placeholder="Enter Tracking ID (e.g., PKT-4091)" 
                  className="flex-grow bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-white font-bold placeholder-white/40 text-sm outline-none focus:border-brand-orange transition-colors"
                />
                <button className="bg-white hover:bg-brand-orange hover:text-white text-brand-dark px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shrink-0">
                  Locate
                </button>
              </div>
            )}

            {/* Tab 2: Quick Estimate Router */}
            {activeTab === 'estimate' && (
              <div className="flex flex-col gap-2 p-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="From (e.g., Nyarugenge)" className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold placeholder-white/40 text-sm outline-none" />
                  <input type="text" placeholder="To (e.g., Rubavu)" className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold placeholder-white/40 text-sm outline-none" />
                </div>
                <button className="w-full bg-white hover:bg-brand-orange hover:text-white text-brand-dark py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors">
                  Calculate Route Pricing →
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Hand: Contextual Visual Frame */}
        <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center w-full aspect-square">
          
          <div className="w-[85%] h-[85%] bg-black/20 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200" 
              alt="Packton logistics management" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/80 via-transparent to-transparent"></div>
          </div>

          {/* Overlay UI Badge: Real-Time Verification Event */}
          <div className="absolute bottom-4 left-0 bg-white p-4 rounded-2xl shadow-2xl border border-brand-light/10 flex items-center gap-3.5 max-w-xs transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 text-xl">
              ✓
            </div>
            <div>
              <p className="text-[10px] font-black text-brand-light uppercase tracking-wider">Recipient Contacted</p>
              <p className="text-xs font-bold text-brand-dark leading-snug mt-0.5">Location verified via dispatcher loop.</p>
            </div>
          </div>

          {/* Overlay UI Badge: Financial Remittance Alert */}
          <div className="absolute top-8 right-2 bg-brand-dark border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 max-w-xs transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 text-lg">
              FR
            </div>
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-wider">COD Treasury</p>
              <p className="text-xs font-bold text-white leading-snug mt-0.5">48h automated payout sequence active.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}