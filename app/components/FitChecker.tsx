import {useState} from 'react';
import {IconCheck, IconClose} from '~/components/Icon';

export function FitChecker() {
  const [doorwayWidth, setDoorwayWidth] = useState('');
  const [result, setResult] = useState<'fit' | 'no-fit' | null>(null);

  const MIN_WIDTH = 31.9;
  const MAX_WIDTH = 36.6;

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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Will it fit your doorway?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Check compatibility in seconds. The TB7 fits doorways between{' '}
            {MIN_WIDTH}–{MAX_WIDTH} inches wide.
          </p>
        </div>

        <form onSubmit={checkFit} className="space-y-6">
          <div>
            <label
              htmlFor="doorway-width"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Enter your doorway width (inches)
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                id="doorway-width"
                value={doorwayWidth}
                onChange={(e) => setDoorwayWidth(e.target.value)}
                step="0.1"
                min="20"
                max="50"
                placeholder="e.g., 34.5"
                className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Check Fit
              </button>
            </div>
          </div>

          {result && (
            <div
              className={`rounded-lg p-6 ${
                result === 'fit'
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 ${
                    result === 'fit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {result === 'fit' ? (
                    <IconCheck className="w-8 h-8" />
                  ) : (
                    <IconClose className="w-8 h-8" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      result === 'fit' ? 'text-green-900' : 'text-red-900'
                    }`}
                  >
                    {result === 'fit'
                      ? 'Perfect fit! ✓'
                      : 'Unfortunately, this won&apos;t fit'}
                  </h3>
                  <p
                    className={`text-sm ${
                      result === 'fit' ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {result === 'fit' ? (
                      <>
                        Your doorway width of {doorwayWidth}" is within the
                        compatible range ({MIN_WIDTH}–{MAX_WIDTH} inches). The
                        TB7 will fit perfectly with its adjustable width
                        mechanism.
                      </>
                    ) : (
                      <>
                        Your doorway width of {doorwayWidth}" is{' '}
                        {parseFloat(doorwayWidth) < MIN_WIDTH
                          ? 'too narrow'
                          : 'too wide'}{' '}
                        for the TB7 (compatible range: {MIN_WIDTH}–{MAX_WIDTH}"
                        ). Please measure again or contact support for
                        alternative solutions.
                      </>
                    )}
                  </p>
                  {result === 'fit' && (
                    <a
                      href="#product-form"
                      className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Measuring tip:</strong> Measure the inside width of your
            door frame where the TB7 will rest. For best results, measure at the
            height where you plan to install the bar (usually around 80-84
            inches from the floor).
          </p>
        </div>
      </div>
    </section>
  );
}
