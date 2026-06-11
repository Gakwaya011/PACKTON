export default function ValueProposition() {
  const features = [
    {
      title: "Pre-Dispatch Verification",
      description: "No more wasted trips. We personally call the recipient to verify coordinates before a package leaves our hub.",
    },
    {
      title: "48h COD Payouts",
      description: "Stop chasing money. Cash collected is audited and remitted directly to your bank account within 48 hours.",
    },
    {
      title: "Partner Dashboard",
      description: "Manage bulk orders, monitor delivery status, and track your payouts through our secure partner portal.",
    }
  ];

  return (
    /* 1. Subtle gray background breaks the "infinite white" page flow */
    <section className="py-32 bg-gray-50 w-full relative">
      
      {/* 2. Added a decorative background element for visual interest */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white hidden lg:block"></div>

      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-20 items-center relative z-10">
        
        {/* Left Side: The Image with a subtle drop shadow */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[4/5] lg:aspect-square w-full shadow-2xl overflow-hidden group">
            <img 
              src="/valuepreposition.jpg" 
              alt="Packton logistics operations" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* The orange accent corner remains for brand identity */}
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-brand-orange"></div>
          </div>
        </div>

        {/* Right Side: The Editorial List with a "card-like" background */}
        <div className="w-full lg:w-1/2 lg:py-10 lg:pl-16">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-brand-dark tracking-tighter leading-none mb-6">
              Packton — Structured <br /> logistics for Rwanda.
            </h2>
            <p className="text-lg text-gray-500 font-light max-w-lg">
              We move beyond generic delivery services by acting as an extension of your business. Reliable, transparent, and built for scale.
            </p>
          </div>

          {/* 3. Grouped features into a container to break up the white space */}
          <div className="bg-white p-8 lg:p-12 border border-gray-100 shadow-sm space-y-12">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="mt-1">
                  <div className="w-8 h-8 flex items-center justify-center border border-brand-orange text-brand-orange rounded-full group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2 tracking-tight group-hover:text-brand-orange transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed max-w-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}