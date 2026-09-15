import { useEffect, useRef, useState } from 'react';

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const duration = 1100;

    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setPercent(Math.round(Math.min(eased, 1) * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const leaveTimer = setTimeout(() => setIsLeaving(true), 1300);
    const hideTimer = setTimeout(() => setIsHidden(true), 2200);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className={`fixed inset-0 z-[100] ${isLeaving ? "pointer-events-none" : ""}`}>

      {/* Curtain panels — split apart on exit */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-brand-dark transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isLeaving ? "-translate-x-full" : "translate-x-0"
        }`}
      ></div>
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-brand-dark transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isLeaving ? "translate-x-full" : "translate-x-0"
        }`}
      ></div>

      {/* Center content */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
          isLeaving ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div className="flex flex-col items-center gap-8">

          {/* Targeting reticle locking onto the logo */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((pos, i) => (
              <div
                key={pos}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`absolute w-5 h-5 ${pos} border-brand-orange transition-all duration-500 ease-out ${
                  percent > 5 ? "opacity-100 scale-100" : "opacity-0 scale-150"
                }`}
              ></div>
            ))}

            <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center shadow-[0_0_40px_rgba(232,82,10,0.5)] animate-pulse">
              <span className="text-white font-black text-xl">P</span>
            </div>
          </div>

          {/* Live percentage counter */}
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-white text-4xl font-black tabular-nums">{percent}</span>
            <span className="text-brand-orange text-xl font-bold">%</span>
          </div>

          {/* Progress bar synced to the counter */}
          <div className="w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-brand-orange rounded-full"
              style={{ width: `${percent}%`, transition: "width 80ms linear" }}
            ></div>
          </div>

          <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">
            Verifying route
          </p>
        </div>
      </div>
    </div>
  );
}
