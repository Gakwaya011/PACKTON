export default function Login() {
  return (
    <div className="min-h-screen bg-brand-ultra flex items-center justify-center px-[6%] pt-20">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl border border-brand-light/10">
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-orange text-white flex items-center justify-center rounded-xl mx-auto mb-4 text-2xl font-black">P</div>
          <h2 className="text-2xl font-extrabold text-brand-dark uppercase tracking-tight">Client Portal</h2>
          <p className="text-sm text-brand-light mt-2">Sign in to manage your deliveries</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Email Address</label>
            <input type="email" className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra" placeholder="admin@company.com" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Password</label>
              <a href="#" className="text-xs text-brand-orange hover:underline">Forgot?</a>
            </div>
            <input type="password" className="px-4 py-3 border border-brand-light/30 rounded-lg focus:outline-none focus:border-brand-orange bg-brand-ultra" placeholder="••••••••" />
          </div>

          <button type="button" className="mt-2 bg-brand-dark text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center border-t border-brand-light/20 pt-6">
          <p className="text-sm text-brand-mid">
            Want to become a B2B partner? <a href="/contact" className="text-brand-orange font-bold hover:underline">Contact Us</a>
          </p>
        </div>
      </div>
    </div>
  );
}