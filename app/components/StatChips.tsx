import {useEffect, useRef, useState} from 'react';
import data from '~/content/tb7.json';

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let started = false; let raf = 0; let start = 0 as number;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          if (prefersReduced) { setValue(target); return; }
          const step = (t: number) => {
            if (!start) start = t;
            const p = Math.min(1, (t - start) / duration);
            setValue(Math.round(target * p));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }
      });
    }, {threshold: 0.25});
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);
  return {value, ref};
}

export function StatChips() {
  const grip = 24; const tested = 573; const install = 10;
  const c1 = useCountUp(grip);
  const c2 = useCountUp(tested);
  const c3 = useCountUp(install);
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <div ref={c1.ref as any} className="stroke-gradient glass-strong px-4 py-2 text-sm font-semibold text-primary/90">
        <span className="text-primary">{c1.value}</span> in grip
      </div>
      <div ref={c2.ref as any} className="stroke-gradient glass-strong px-4 py-2 text-sm font-semibold text-primary/90">
        <span className="text-primary">{c2.value}</span> lb tested
      </div>
      <div ref={c3.ref as any} className="stroke-gradient glass-strong px-4 py-2 text-sm font-semibold text-primary/90">
        <span className="text-primary">{c3.value}</span> sec install
      </div>
    </div>
  );
}
