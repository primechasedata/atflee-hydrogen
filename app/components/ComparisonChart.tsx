import {IconCheck, IconClose} from '~/components/Icon';

interface ComparisonFeature {
  feature: string;
  trahere: boolean | string;
  cheapBars: boolean | string;
  gymBars: boolean | string;
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    feature: 'Shoulder-safe wide grip',
    trahere: true,
    cheapBars: false,
    gymBars: 'Sometimes',
  },
  {
    feature: 'No door frame damage',
    trahere: true,
    cheapBars: false,
    gymBars: 'N/A - Mounted',
  },
  {
    feature: 'Install/remove in seconds',
    trahere: '5 seconds',
    cheapBars: '30-60 sec',
    gymBars: false,
  },
  {
    feature: 'Weight capacity',
    trahere: '300 lbs',
    cheapBars: '200 lbs',
    gymBars: '400+ lbs',
  },
  {
    feature: 'Medical-grade foam',
    trahere: true,
    cheapBars: false,
    gymBars: 'Metal only',
  },
  {
    feature: 'Portable/travel-friendly',
    trahere: true,
    cheapBars: true,
    gymBars: false,
  },
  {
    feature: 'Warranty',
    trahere: '5 years',
    cheapBars: '90 days',
    gymBars: '1 year',
  },
  {
    feature: 'Price',
    trahere: '$129',
    cheapBars: '$25-40',
    gymBars: '$200-500',
  },
  {
    feature: 'Daily use durability',
    trahere: true,
    cheapBars: false,
    gymBars: true,
  },
  {
    feature: 'Money-back guarantee',
    trahere: '30 days',
    cheapBars: false,
    gymBars: 'Rarely',
  },
];

export function ComparisonChart() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
          How Trahere TB7 Compares
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Not all pull-up bars are created equal
        </p>
      </div>

      {/* Mobile View - Card Style */}
      <div className="lg:hidden space-y-6">
        <ComparisonCard
          title="Trahere TB7"
          subtitle="Best for home athletes"
          highlighted
        />
        <ComparisonCard
          title="Cheap Amazon Bars"
          subtitle="$25-40 options"
        />
        <ComparisonCard
          title="Wall-Mounted Gym Bars"
          subtitle="Permanent installation"
        />
      </div>

      {/* Desktop View - Table Style */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-neutral-200">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50">
              <th className="px-6 py-4 text-left font-semibold text-neutral-900">
                Feature
              </th>
              <th className="px-6 py-4 text-center bg-neutral-900 text-white">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">Trahere TB7</span>
                  <span className="text-xs text-neutral-300 mt-1">
                    Recommended
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-center font-semibold text-neutral-900">
                Cheap Amazon Bars
              </th>
              <th className="px-6 py-4 text-center font-semibold text-neutral-900">
                Wall-Mounted Bars
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((row, index) => (
              <tr
                key={row.feature}
                className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
              >
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {row.feature}
                </td>
                <td className="px-6 py-4 text-center bg-neutral-900/5">
                  <ComparisonValue value={row.trahere} highlight />
                </td>
                <td className="px-6 py-4 text-center">
                  <ComparisonValue value={row.cheapBars} />
                </td>
                <td className="px-6 py-4 text-center">
                  <ComparisonValue value={row.gymBars} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg font-semibold text-neutral-900 mb-4">
          The TB7 gives you gym-quality results without permanent installation
        </p>
        <a
          href="#buy"
          className="inline-flex items-center px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors text-lg font-semibold"
        >
          Get Your TB7 Today
        </a>
      </div>
    </section>
  );
}

function ComparisonValue({
  value,
  highlight = false,
}: {
  value: boolean | string;
  highlight?: boolean;
}) {
  if (typeof value === 'boolean') {
    return (
      <div className="flex justify-center">
        {value ? (
          <IconCheck
            className={highlight ? 'text-green-600' : 'text-green-500'}
          />
        ) : (
          <IconClose
            className={highlight ? 'text-red-600' : 'text-red-500'}
          />
        )}
      </div>
    );
  }

  return (
    <span
      className={
        highlight
          ? 'font-semibold text-neutral-900'
          : 'text-neutral-600'
      }
    >
      {value}
    </span>
  );
}

function ComparisonCard({
  title,
  subtitle,
  highlighted = false,
}: {
  title: string;
  subtitle: string;
  highlighted?: boolean;
}) {
  const dataKey = title.includes('TB7')
    ? 'trahere'
    : title.includes('Amazon')
      ? 'cheapBars'
      : 'gymBars';

  return (
    <div
      className={`rounded-2xl border-2 p-6 ${
        highlighted
          ? 'border-neutral-900 bg-neutral-900 text-white'
          : 'border-neutral-200 bg-white'
      }`}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p
          className={`text-sm mt-1 ${highlighted ? 'text-neutral-300' : 'text-neutral-600'}`}
        >
          {subtitle}
        </p>
      </div>
      <div className="space-y-3">
        {COMPARISON_DATA.map((row) => {
          const value = row[dataKey as keyof ComparisonFeature];
          return (
            <div
              key={row.feature}
              className={`flex justify-between items-center py-2 border-b ${
                highlighted ? 'border-neutral-700' : 'border-neutral-100'
              }`}
            >
              <span className="text-sm font-medium">{row.feature}</span>
              <span className="text-sm">
                {typeof value === 'boolean' ? (
                  value ? (
                    <IconCheck className="text-green-500" />
                  ) : (
                    <IconClose className="text-red-500" />
                  )
                ) : (
                  <span className={highlighted ? 'font-semibold' : ''}>
                    {value}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
