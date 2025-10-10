interface Step {
  number: number;
  title: string;
  description: string;
  image?: string;
  tip?: string;
}

const INSTALLATION_STEPS: Step[] = [
  {
    number: 1,
    title: 'Position the bar',
    description:
      'Place the TB7 horizontally in your door frame at the desired height. The foam pads should face the door frame.',
    tip: 'Standard pull-up height is about 7 feet from the floor',
  },
  {
    number: 2,
    title: 'Extend to fit',
    description:
      'Turn the central adjustment knob counter-clockwise until the bar extends to contact both sides of the door frame firmly.',
    tip: 'You should feel resistance as it touches both sides',
  },
  {
    number: 3,
    title: 'Lock it in',
    description:
      'Continue turning the knob an additional 2-3 full rotations to create secure pressure against the frame.',
    tip: 'The bar should not move when you shake it gently',
  },
  {
    number: 4,
    title: 'Test before use',
    description:
      'Hang from the bar with both hands and let it support your full weight. Check for any movement or slipping.',
    tip: 'Start with assisted pull-ups or dead hangs to build confidence',
  },
];

interface InstallationGuideProps {
  variant?: 'default' | 'compact';
}

export function InstallationGuide({variant = 'default'}: InstallationGuideProps) {
  if (variant === 'compact') {
    return (
      <div className="py-6">
        <h3 className="text-xl font-bold mb-4">Installation in 4 Steps</h3>
        <div className="space-y-3">
          {INSTALLATION_STEPS.map((step) => (
            <div key={step.number} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
              <div>
                <div className="font-semibold">{step.title}</div>
                <p className="text-sm text-neutral-600 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24 bg-neutral-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
          Installation in 4 Easy Steps
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          No tools required. Takes less than 30 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {INSTALLATION_STEPS.map((step) => (
          <div key={step.number} className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xl mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {step.description}
              </p>
              {step.tip && (
                <div className="bg-[rgb(var(--color-accent))]/10 border-l-4 border-[rgb(var(--color-accent))] px-3 py-2 mt-4">
                  <p className="text-sm text-primary">
                    <span className="font-semibold">Tip:</span> {step.tip}
                  </p>
                </div>
              )}
            </div>
            {step.number < INSTALLATION_STEPS.length && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-neutral-300">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Safety Checklist</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-neutral-700">
                  Check door frame is 24-36 inches wide
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-neutral-700">
                  Ensure frame is sturdy (wood, metal, or composite)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-neutral-700">
                  Test with full weight before first workout
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-neutral-700">
                  Re-check tightness every 2 weeks
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Common Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-neutral-900">
                  What if my door frame is too wide?
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  The TB7 extends from 24-36 inches. If your frame is wider,
                  contact us for our extended model.
                </p>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">
                  Can I leave it installed?
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  Yes! Many customers leave it up permanently. Just check
                  tightness weekly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-neutral-600 mb-4">
          Need help with installation?
        </p>
        <a
          href="mailto:support@trahere.com"
          className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
}
