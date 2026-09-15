import { useEffect, useState } from 'react';

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const principles = [
    {
      id: "01",
      title: "Uncompromising Speed",
      description: "Time is the only currency that matters in logistics. We route, dispatch, and deliver with relentless efficiency to keep your business moving."
    },
    {
      id: "02",
      title: "Radical Transparency",
      description: "No blind spots. From pickup to final signature, our tracking architecture provides total visibility for you, your team, and your clients."
    },
    {
      id: "03",
      title: "Engineered for Scale",
      description: "Whether you are shipping 10 parcels a month or 1,000 a day, our digital and physical infrastructure is built to absorb your growth flawlessly."
    }
  ];

  return (
    <div className="w-full bg-white font-sans">
      
      {/* 1. CINEMATIC PHOTO HERO */}
      <section className="relative min-h-[80vh] lg:min-h-[88vh] flex items-end overflow-hidden bg-black border-b border-white/5">

        {/* Background photo with a slow Ken Burns push-in */}
        <img
          src="/about-hero.jpg"
          alt="Packton courier dispatching a parcel from a branded motorcycle in Kigali"
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 transform transition-all duration-[3000ms] ease-out ${
            isLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        />

        {/* Gradients for legibility — dark base + a left-side wash for the copy */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent z-0"></div>

        <div className="relative z-10 w-full max-w-[1760px] mx-auto px-6 lg:px-12 pt-40 pb-16 lg:pb-24">
          <div
            className={`flex items-center gap-4 mb-8 transform transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="w-8 h-[2px] bg-[#E8520A]"></div>
            <p className="text-[#E8520A] font-bold tracking-[0.2em] uppercase text-xs">
              Who We Are
            </p>
          </div>

          <h1
            className={`max-w-3xl text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-8 drop-shadow-lg transform transition-all duration-1000 delay-500 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <span className="text-white block mb-2">We don't just move boxes.</span>
            <span className="text-white/40 block">We build infrastructure.</span>
          </h1>

          <p
            className={`text-base md:text-lg text-white/60 font-light max-w-xl leading-relaxed transform transition-all duration-1000 delay-700 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Packton is a technology-driven logistics network. We are solving the most complex challenges of last-mile delivery in Rwanda by merging physical fleets with digital precision.
          </p>
        </div>
      </section>

      {/* 2. THE MISSION (Clean, high-padding editorial layout) */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-white">
        <div className="max-w-[1760px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Sticky Left Column */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter leading-[1.1] lg:sticky lg:top-32 pr-8">
              Distance should never be a barrier to <span className="text-[#E8520A]">growth.</span>
            </h2>
          </div>

          {/* Right Column Text */}
          <div className="lg:col-span-7 lg:pl-16 flex flex-col gap-8">
            <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed">
              Before Packton, businesses in Kigali struggled with a fragmented delivery market. Lost packages, delayed cash remittances, and zero tracking visibility were the industry standard. We knew there had to be a better way.
            </p>
            <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed">
              We engineered a system that removes the friction from shipping. By standardizing the workflow—from the moment you upload a manifest to the exact second the cash hits your account—we give businesses the confidence to scale without worrying about logistics.
            </p>
            
            <div className="mt-8 inline-flex items-center gap-5 p-6 bg-gray-50 border border-gray-100 w-fit">
              <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-white font-black text-xl">P</span>
              </div>
              <div>
                <p className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-1">Leadership Team</p>
                <p className="text-xs text-gray-400 font-mono">HQ: KIGALI, RWANDA</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. OPERATING PRINCIPLES */}
      <section className="bg-gray-50 py-20 lg:py-24 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-[1760px] mx-auto">

          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark tracking-tighter mb-6">
              Our Operating Principles
            </h2>
            <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed">
              The uncompromising standards that dictate every dispatch, route, and technological update we make at Packton.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle) => (
              <div key={principle.id} className="bg-white p-8 lg:p-10 border border-gray-200 flex flex-col h-full hover:border-[#E8520A]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="text-gray-300 font-mono text-xl font-black mb-6 block">
                  {principle.id}
                </span>
                <h3 className="text-xl font-bold text-brand-dark tracking-tight mb-4">
                  {principle.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-light mt-auto">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}