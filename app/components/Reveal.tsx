import {useEffect, useRef} from 'react';

type RevealProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  threshold?: number;
};

export function Reveal({as = 'div', className = '', children, threshold = 0.15}: RevealProps) {
  const Comp = as as any;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as Element | null;
    if (!el || typeof window === 'undefined') return;

    el.classList.add('reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('inview');
          }
        });
      },
      {threshold}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

