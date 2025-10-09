import {Heading, Text} from '~/components/Text';

export function OriginStory() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading as="h2" size="heading" className="text-primary">Why we built the TB7</Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70">Born from frustration with generic equipment that didn't work.</Text>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="glass-soft rounded-2xl p-8 md:p-12 ring-1 ring-white/10">
            <p className="text-primary/85 leading-relaxed mb-6">
              Like many fitness enthusiasts, we struggled with traditional pull-up bars. Narrow grips caused shoulder pain. Installation required drilling holes. Door frames got damaged. Bars wobbled under weight.
            </p>
            <p className="text-primary/85 leading-relaxed mb-6">
              We knew there had to be a better way. After months of research, prototyping, and testing, we developed the TB7—a pull-up bar that solves every problem we encountered.
            </p>
            <p className="text-primary/85 leading-relaxed">
              The TB7's wide 24-inch grip matches the natural width of your shoulders, eliminating strain. Tool-free installation takes 10 seconds. Protective padding prevents door damage. And after laboratory testing to 573 pounds, we knew we had something special.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">24"</div>
              <p className="text-sm font-semibold text-primary mb-1">Wide Grip</p>
              <p className="text-xs text-primary/70">Matches natural shoulder width</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">573 lb</div>
              <p className="text-sm font-semibold text-primary mb-1">Lab Tested</p>
              <p className="text-xs text-primary/70">Exceeds commercial standards</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">10 sec</div>
              <p className="text-sm font-semibold text-primary mb-1">Installation</p>
              <p className="text-xs text-primary/70">No tools or drilling required</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 glass-tint rounded-xl">
          <p className="text-sm text-primary text-center italic">
            "We don't just sell equipment—we solve problems. Every feature of the TB7 exists because we experienced the frustration ourselves and refused to accept 'good enough.'"
          </p>
        </div>
      </div>
    </section>
  );
}
