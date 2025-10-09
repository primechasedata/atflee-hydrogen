import {Heading, Text} from '~/components/Text';
import {IconShield} from '~/components/Icon';

export function ExpertEndorsement() {
  const experts = [
    {
      name: 'Dr. Sarah Chen, PT, DPT',
      title: 'Physical Therapist & Strength Coach',
      credential: '15 years experience',
      quote:
        'The 24-inch grip width is a game-changer for shoulder health. Most pull-up bars force an unnatural narrow grip that can lead to impingement. The TB7\'s wide grip allows for proper shoulder mechanics and reduces injury risk significantly.',
      initials: 'SC',
    },
    {
      name: 'Mike Rodriguez',
      title: 'Certified Strength & Conditioning Specialist',
      credential: 'CSCS, USAW',
      quote:
        'I recommend the TB7 to all my clients. The installation is genuinely tool-free, which means they actually use it consistently. The weight capacity exceeds what 99% of users will ever need, and the protective padding means no excuses about door damage.',
      initials: 'MR',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-accent))]/20 border-2 border-[rgb(var(--color-accent))]/40 mb-6">
            <IconShield className="w-8 h-8 text-[rgb(var(--color-accent))]" />
          </div>
          <Heading as="h2" size="heading" className="text-primary text-4xl md:text-5xl font-bold">
            Trusted by fitness professionals
          </Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70 text-lg">
            Endorsed by physical therapists and strength coaches
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {experts.map((expert, idx) => (
            <div key={idx} className="glass rounded-2xl p-8 border border-white/10 hover-lift">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[rgb(var(--color-accent))]/20 flex items-center justify-center text-primary font-bold text-lg border-2 border-[rgb(var(--color-accent))]/40 flex-shrink-0">
                  {expert.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">{expert.name}</h3>
                  <p className="text-sm font-semibold text-[rgb(var(--color-accent))]">{expert.title}</p>
                  <p className="text-xs text-primary/60 mt-1">{expert.credential}</p>
                </div>
              </div>
              <blockquote className="text-primary/85 leading-relaxed italic border-l-4 border-[rgb(var(--color-accent))] pl-4">
                "{expert.quote}"
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-primary/60">
            The TB7 is designed with biomechanics and safety in mind, meeting the standards that professionals expect.
          </p>
        </div>
      </div>
    </section>
  );
}
