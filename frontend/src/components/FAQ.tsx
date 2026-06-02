export default function FAQ() {
  const faqs = [
    {
      q: "How fast do you deliver inside Kigali?",
      a: "Most local orders are picked up, verified, and delivered within 2 to 4 hours, depending on the chosen urgency tier and package sizing."
    },
    {
      q: "How does the Cash on Delivery (COD) workflow function?",
      a: "When booking a parcel, specify the required COD collector amount. Our rider verifies the funds directly upon handoff, logs the successful receipt on our platform, and our treasury initiates a payout loop back to your verified account within 48 hours."
    },
    {
      q: "What regions do you fully cover?",
      a: "We offer full-scale delivery solutions throughout Kigali, route links upcountry to major provincial hubs, and coordinate structured cross-border transport options."
    }
  ];

  return (
    <section className="bg-white py-24 px-6 lg:px-12 border-t border-brand-light/20">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-3">Clear Answers</p>
          <h2 className="text-4xl font-black text-brand-dark tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 md:p-8 bg-brand-ultra rounded-2xl border border-brand-light/10">
              <h3 className="text-lg font-bold text-brand-dark uppercase tracking-tight mb-3">
                {faq.q}
              </h3>
              <p className="text-brand-dark/70 text-sm leading-relaxed font-light">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}