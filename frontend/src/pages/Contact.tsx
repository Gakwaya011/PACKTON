export default function Contact() {
  return (
    <div className="pt-28 min-h-screen bg-brand-white px-[6%] pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info Side */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-brand-dark mb-6 uppercase tracking-tight">
            Let's get moving.
          </h1>
          <p className="text-brand-mid mb-10 text-lg">
            Have a question about our enterprise rates or need to track a specific parcel? Our dispatch team is ready to help.
          </p>
          
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-brand-light uppercase tracking-widest mb-1">Call / WhatsApp</p>
              <p className="text-xl font-semibold text-brand-dark">+250 7XX XXX XXX</p>
            </div>
            <div>
              <p className="text-xs font-bold text-brand-light uppercase tracking-widest mb-1">Email</p>
              <p className="text-xl font-semibold text-brand-dark">info@packton.com</p>
            </div>
            <div>
              <p className="text-xs font-bold text-brand-light uppercase tracking-widest mb-1">Headquarters</p>
              <p className="text-xl font-semibold text-brand-dark">Kigali, Rwanda</p>
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-brand-light/10">
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Full Name</label>
              <input type="text" className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-brand-ultra" placeholder="Your name" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Email or Phone</label>
              <input type="text" className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-brand-ultra" placeholder="How can we reach you?" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Message</label>
              <textarea rows={4} className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-brand-ultra" placeholder="How can we help your business?"></textarea>
            </div>

            <button type="button" className="mt-4 bg-brand-orange text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}