export default function Features() {
  const points = [
    {
      num: "01",
      title: "Confirm Before We Move",
      desc: "We completely eliminate failed deliveries by contacting recipients before dispatch riders head out. No wasted fuel, no missed timings."
    },
    {
      num: "02",
      title: "48-Hour COD Remittance",
      desc: "Cash on delivery collected on your behalf doesn't vanish. Our tracking financial engine processes receipts and remits payments to your bank within 48 hours."
    },
    {
      num: "03",
      title: "Real-Time Tracking & SMS",
      desc: "Full status updates on every milestone. Senders and recipients get automatic text notifications from the moment a package is booked to handoff."
    }
  ];

  return (
    <section className="bg-brand-teal text-white py-24 px-6 lg:px-12 rounded-[2.5rem] mx-4 md:mx-6 lg:mx-8 my-12 shadow-2xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4">
            <p className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-3">Operational Excellence</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-6">
              Why Choose Packton?
            </h2>
            <p className="text-white/60 leading-relaxed font-light">
              We stripped away the complexity of traditional delivery networks to create a dependable, friction-free transport system for East Africa.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col divide-y divide-white/10">
            {points.map((point) => (
              <div key={point.num} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 first:pt-0 last:pb-0 items-start">
                <div className="md:col-span-2 text-3xl font-black text-brand-orange">{point.num}</div>
                <div className="md:col-span-4 text-xl font-bold uppercase tracking-tight text-white">{point.title}</div>
                <div className="md:col-span-6 text-white/70 text-sm leading-relaxed font-light">{point.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}