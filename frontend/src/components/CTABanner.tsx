import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto bg-black text-white p-12 md:p-20 rounded-[2.5rem] text-center relative overflow-hidden shadow-xl">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase">
          Ready to get moving?
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10 text-base md:text-lg font-light">
          Experience clean logistics mapping with no guesswork. Set up your delivery route parameters instantly.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="bg-brand-orange text-white font-bold text-sm px-8 py-4 rounded-full uppercase tracking-wider hover:bg-white hover:text-brand-dark transition-colors shadow-lg">
            Create Booking
          </Link>
          <Link to="/login" className="bg-white/10 border border-white/20 text-white font-bold text-sm px-8 py-4 rounded-full uppercase tracking-wider hover:bg-white/20 transition-colors">
            Portal Access
          </Link>
        </div>
      </div>
    </section>
  );
}