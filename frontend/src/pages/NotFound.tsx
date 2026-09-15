import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-brand-white">
      <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs mb-6">Error 404</p>
      <h1 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter mb-6">
        Route not found.
      </h1>
      <p className="text-lg text-brand-mid font-light max-w-md mb-10">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="bg-brand-orange text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1"
      >
        Back to home
      </Link>
    </div>
  );
}
