import {Heading, Text} from '~/components/Text';

export function ExpertEndorsement() {
  const experts = [
    {
      name: 'Dr. Sarah Chen, PT, DPT',
      title: 'Physical Therapist & Strength Coach',
      credential: '15 years experience',
      quote:
        'The 24-inch grip width is a game-changer for shoulder health. Most pull-up bars force an unnatural narrow grip that can lead to impingement. The TB7&apos;s wide grip allows for proper shoulder mechanics and reduces injury risk significantly.',
      photo: '👩‍⚕️',
    },
    {
      name: 'Mike Rodriguez',
      title: 'Certified Strength & Conditioning Specialist',
      credential: 'CSCS, USAW',
      quote:
        'I recommend the TB7 to all my clients. The installation is genuinely tool-free, which means they actually use it consistently. The weight capacity exceeds what 99% of users will ever need, and the protective padding means no excuses about door damage.',
      photo: '💪',
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading as="h2" size="heading" className="text-primary">Trusted by fitness professionals</Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70">Endorsed by physical therapists and strength coaches</Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experts.map((expert, idx) => (
            <div key={idx} className="glass-soft rounded-2xl p-8 ring-1 ring-white/10 transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{expert.photo}</div>
                <div>
                  <h3 className="text-lg font-bold text-primary">{expert.name}</h3>
                  <p className="text-sm font-medium text-[rgb(var(--color-accent))]">{expert.title}</p>
                  <p className="text-xs text-primary/60">{expert.credential}</p>
                </div>
              </div>
              <blockquote className="text-primary/85 leading-relaxed italic border-l-4 border-[rgb(var(--color-accent))] pl-4">
                "{expert.quote}"
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-primary/70">
            The TB7 is designed with biomechanics and safety in mind, meeting the standards that professionals expect.
          </p>
        </div>
      </div>
    </section>
  );
}
