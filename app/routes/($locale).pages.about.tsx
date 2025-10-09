import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';
import type {MetaArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  return json({
    seo: {
      title: 'About Trahere | Our Story',
      description:
        'Learn how Trahere is helping thousands build a daily pull-up habit at home with the TB7 - the shoulder-safe pull-up bar.',
    },
  });
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data!.seo);
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6">
            Building stronger bodies, one pull-up at a time
          </h1>
          <p className="text-xl text-neutral-300 leading-relaxed">
            Trahere is on a mission to make pull-ups accessible, safe, and
            effective for everyone training at home.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            The Trahere TB7 was born from frustration. Our founder, a physical
            therapist and home fitness enthusiast, kept seeing the same pattern:
            people buying cheap pull-up bars, developing shoulder pain, and
            giving up on one of the best upper body exercises.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            The problem wasn't the exercise—it was the equipment. Standard
            pull-up bars force your shoulders into internal rotation, a position
            that causes impingement and pain over time. It's why so many people
            "can't do pull-ups"—their equipment is working against them.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            We spent 18 months engineering the TB7 with one goal: create a
            pull-up bar that's safe for daily use. The result is a bar that's 7
            inches wider than standard bars, keeping your shoulders in natural
            external rotation and eliminating the pinch that ends most home
            pull-up journeys.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Why We Exist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold mb-3">Make Pull-Ups Accessible</h3>
              <p className="text-neutral-700">
                Pull-ups are one of the most effective upper body exercises, but
                most people give up too soon. We're changing that with equipment
                that makes the movement sustainable.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3">Enable Home Training</h3>
              <p className="text-neutral-700">
                Not everyone has time for the gym. We believe world-class
                strength training should be possible in your doorway, without
                damage, screws, or complexity.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-3">Prevent Injury</h3>
              <p className="text-neutral-700">
                Equipment should enhance performance, not cause pain. Every
                design decision we make prioritizes long-term joint health and
                sustainable training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-extrabold text-neutral-900 mb-2">
              10,000+
            </div>
            <div className="text-neutral-600">Athletes training</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold text-neutral-900 mb-2">
              2M+
            </div>
            <div className="text-neutral-600">Pull-ups completed</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold text-neutral-900 mb-2">
              98%
            </div>
            <div className="text-neutral-600">Customer satisfaction</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold text-neutral-900 mb-2">
              4.9/5
            </div>
            <div className="text-neutral-600">Average rating</div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="bg-neutral-900 text-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            What We Stand For
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-xl font-bold mb-2">
                Quality Over Quick Profits
              </h3>
              <p className="text-neutral-300">
                We could sell cheaper bars. We choose not to. The TB7 costs more
                to make, but it lasts 10x longer and performs infinitely better.
              </p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-xl font-bold mb-2">
                Customer Success First
              </h3>
              <p className="text-neutral-300">
                Our success is measured by your pull-up progress, not our sales
                numbers. That's why we offer 30-day returns, lifetime support,
                and a 5-year warranty.
              </p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-xl font-bold mb-2">
                Evidence-Based Design
              </h3>
              <p className="text-neutral-300">
                Every feature exists for a reason, backed by biomechanics
                research and real-world testing. No gimmicks, just what works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Join the Movement
        </h2>
        <p className="text-xl text-neutral-600 mb-8">
          Over 10,000 people have transformed their home training with the TB7.
          You're next.
        </p>
        <a
          href="/products/tb7-widest-grip-doorway-pull-up-bar"
          className="inline-flex items-center px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors text-lg font-semibold"
        >
          Shop TB7 Pull-Up Bar
        </a>
      </section>
    </div>
  );
}
