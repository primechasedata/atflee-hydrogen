import {Heading, Text} from '~/components/Text';

import {useState} from 'react';

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

  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading as="h2" size="heading" className="text-primary">Development Timeline</Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70">18 months of research, design, and testing</Text>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white/10"></div>

          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                onMouseEnter={() => setActive(idx)}
                onMouseLeave={() => setActive((cur) => (cur === idx ? null : cur))}
                onFocus={() => setActive(idx)}
                onBlur={() => setActive((cur) => (cur === idx ? null : cur))}
              >
                {/* Content */}
                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-soft rounded-xl p-6 ring-1 ring-white/10">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))]/10 rounded-full mb-3">
                      {milestone.phase}
                    </span>
                    <h3 className="text-xl font-bold text-primary mb-2">{milestone.title}</h3>
                    <p className="text-primary/75 text-sm">{milestone.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-accent))] text-white text-2xl shadow-lg z-10 flex-shrink-0">
                  {milestone.icon}
                </div>

                {/* Mobile icon */}
                <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[rgb(var(--color-accent))] text-white text-xl shadow-lg flex-shrink-0">
                  {milestone.icon}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>

                {/* Tooltip */}
                {active === idx && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 translate-y-full glass-strong rounded-lg p-4 ring-1 ring-white/10 max-w-xs">
                    <p className="text-sm text-primary/80">{milestone.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-primary/70 max-w-2xl mx-auto">
            Every feature was purpose-built to solve real problems. We didn't just create another pull-up bar—we reimagined what one should be.
          </p>
        </div>
      </div>
    </section>
  );
}
