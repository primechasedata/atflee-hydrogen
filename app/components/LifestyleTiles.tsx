import {useEffect, useRef} from 'react';
import data from '~/content/tb7.json';

export function LifestyleTiles() {
  const items = (data as any)?.lifestyle || [];
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((it: any) => (
        <ParallaxTile key={it.title} title={it.title} image={it.image} alt={it.alt} />
      ))}
    </div>
  );
}

function ParallaxTile({title, image, alt}: {title: string; image?: string; alt?: string}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onMove = (e: MouseEvent) => {
      if (reduced) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) / r.width;
      const dy = (e.clientY - (r.top + r.height/2)) / r.height;
      el.style.transform = `translateY(${(-dy*4).toFixed(2)}px)`;
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', () => { el.style.transform = 'translateY(0)'; });
    return () => { el.removeEventListener('mousemove', onMove); };
  }, []);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[16px] glass-soft ring-1 ring-white/10 hover-lift">
      <div className="aspect-[4/3] w-full bg-white/5">
        {image ? (
          <img src={image} alt={alt || title} title={title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/50">{title}</div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/30 to-transparent">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm text-primary ring-1 ring-white/20">
          {title}
        </div>
      </div>
    </div>
  );
}
