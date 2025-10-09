export function ProductTimeline() {
  const milestones = [
    {
      phase: 'Research',
      title: 'Problem identification',
      description:
        'Analyzed 200+ customer reviews of existing pull-up bars to identify pain points',
      icon: '🔍',
    },
    {
      phase: 'Design',
      title: 'Wide-grip prototype',
      description:
        'Developed 24-inch grip design based on biomechanical research and shoulder anatomy',
      icon: '📐',
    },
    {
      phase: 'Engineering',
      title: 'Tool-free mechanism',
      description:
        'Created patented adjustment system for installation without drilling',
      icon: '⚙️',
    },
    {
      phase: 'Testing',
      title: 'Weight capacity validation',
      description:
        'Laboratory tested to 573 lbs—more than double the recommended capacity',
      icon: '🏋️',
    },
    {
      phase: 'Protection',
      title: 'Door-safe padding',
      description:
        'Engineered multi-layer foam to distribute weight and prevent door frame damage',
      icon: '🛡️',
    },
    {
      phase: 'Patent',
      title: 'IP protection filed',
      description:
        'Secured patents for unique grip width and tool-free installation system',
      icon: '📜',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Development Timeline
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            18 months of research, design, and testing
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={`relative flex items-center gap-8 ${
                  idx % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    idx % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                      {milestone.phase}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl shadow-lg z-10 flex-shrink-0">
                  {milestone.icon}
                </div>

                {/* Mobile icon */}
                <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl shadow-lg flex-shrink-0">
                  {milestone.icon}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Every feature was purpose-built to solve real problems. We didn't
            just create another pull-up bar—we reimagined what one should be.
          </p>
        </div>
      </div>
    </section>
  );
}
