import {useState} from 'react';
import {IconCheck, IconClose} from '~/components/Icon';
import {Reveal} from '~/components/Reveal';
import content from '~/content/tb7.json';
import {Heading, Text} from '~/components/Text';

export function FitChecker() {
  const [doorwayWidth, setDoorwayWidth] = useState('');
  const [result, setResult] = useState<'fit' | 'no-fit' | null>(null);

  const cfg = (content as any)?.product?.fit || {fitMin: 31.9, fitMax: 36.6, tightMin: 30.0, tightMax: 31.8};
  const MIN_WIDTH = cfg.fitMin;
  const MAX_WIDTH = cfg.fitMax;

  const checkFit = (e: React.FormEvent) => {
    e.preventDefault();
    const width = parseFloat(doorwayWidth);

    if (isNaN(width)) {
      setResult(null);
      return;
    }

    if (width >= MIN_WIDTH && width <= MAX_WIDTH) {
      setResult('fit');
    } else {
      setResult('no-fit');
    }
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal className="text-center mb-8">
          <Heading as="h2" size="heading" className="text-primary">Will it fit your doorway?</Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70">Check compatibility in seconds. The TB7 fits doorways between {cfg.fitMin}–{cfg.fitMax} inches wide.</Text>
        </Reveal>

        <Reveal>
          <form onSubmit={checkFit} className="glass-strong stroke-gradient rounded-2xl p-6 md:p-8 text-primary/90 space-y-6" aria-live="polite">
            <div className="grid gap-4">
              <label htmlFor="doorway-width" className="block text-sm font-medium">Enter your doorway width (inches)</label>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <input
                  type="number"
                  id="doorway-width"
                  value={doorwayWidth}
                  onChange={(e) => setDoorwayWidth(e.target.value)}
                  step="0.1"
                  min={MIN_WIDTH}
                  max={MAX_WIDTH}
                  placeholder="e.g., 34.5"
                  className="flex-1 rounded-md bg-white/5 border border-white/10 px-4 py-3 text-primary placeholder:text-primary/50 focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-transparent min-h-[48px]"
                  required
                />
                <button type="submit" className="btn-accent whitespace-nowrap min-h-[48px] px-6">Check Fit</button>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <input
                  type="range"
                  min={MIN_WIDTH}
                  max={MAX_WIDTH}
                  step={0.1}
                  value={doorwayWidth || (MIN_WIDTH as any)}
                  onChange={(e) => setDoorwayWidth(e.target.value)}
                  aria-label="Doorway width slider"
                  className="w-full accent-[rgb(var(--color-accent))] h-2
                    [&::-webkit-slider-runnable-track]:h-2
                    [&::-webkit-slider-runnable-track]:rounded-full
                    [&::-webkit-slider-runnable-track]:bg-white/10
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:w-6
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[rgb(var(--color-accent))]
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:ring-2
                    [&::-webkit-slider-thumb]:ring-white/20
                    [&::-moz-range-track]:h-2
                    [&::-moz-range-track]:rounded-full
                    [&::-moz-range-track]:bg-white/10
                    [&::-moz-range-thumb]:h-6
                    [&::-moz-range-thumb]:w-6
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[rgb(var(--color-accent))]
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                />
                <span className="text-sm sm:text-base text-primary/70 whitespace-nowrap min-w-[3.5rem] text-right font-semibold">{doorwayWidth || MIN_WIDTH}"</span>
              </div>
            </div>

            {result && (
              <div className={`rounded-xl p-5 md:p-6 ${result === 'fit' ? 'bg-green-500/10 ring-1 ring-green-400/20' : 'bg-red-500/10 ring-1 ring-red-400/20'}`}>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 ${result === 'fit' ? 'text-green-400' : 'text-red-400'}`}>
                    {result === 'fit' ? <IconCheck className="w-7 h-7" /> : <IconClose className="w-7 h-7" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-1 ${result === 'fit' ? 'text-green-300' : 'text-red-300'}`}>
                      {result === 'fit' ? 'Perfect fit! ✓' : "Unfortunately, this won't fit"}
                    </h3>
                    <p className={`text-sm ${result === 'fit' ? 'text-green-200' : 'text-red-200'}`}>
                      {result === 'fit' ? (
                        <>Your doorway width of {doorwayWidth}" is within the compatible range ({MIN_WIDTH}–{MAX_WIDTH} inches). The TB7 will fit perfectly with its adjustable width mechanism.</>
                      ) : (
                        <>Your doorway width of {doorwayWidth}" is {parseFloat(doorwayWidth) < MIN_WIDTH ? 'too narrow' : 'too wide'} for the TB7 (compatible range: {MIN_WIDTH}–{MAX_WIDTH}"). Please measure again or contact support for alternatives.</>
                      )}
                    </p>
                    {result === 'fit' && (
                      <a href="#product-form" className="mt-3 inline-block rounded-md bg-green-500/20 px-4 py-2 text-green-200 hover:bg-green-500/25 transition">Add to Cart</a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </Reveal>

        <Reveal className="mt-8 glass-soft rounded-xl p-4">
          <p className="text-sm text-primary/80">
            <strong>Measuring tip:</strong> Measure the inside width of your door frame where the TB7 will rest. For best results, measure at the height where you plan to install the bar (usually around 80–84 inches from the floor).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
