import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense, useEffect, useRef, useState} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta, Money} from '@shopify/hydrogen';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {AddToCartButton} from '~/components/AddToCartButton';
import {StatChips} from '~/components/StatChips';
import {LifestyleTiles} from '~/components/LifestyleTiles';
import {IconCheck, IconShield, IconTruck, IconSparkle, IconLock, IconSun, IconPlane, IconMoon, IconRuler, IconDumbbell, IconExpand, IconBolt} from '~/components/Icon';
import {Newsletter} from '~/components/Newsletter';
import {Heading, Text} from '~/components/Text';
import {OriginStory} from '~/components/OriginStory';
import {ProductTimeline} from '~/components/ProductTimeline';
import {ExpertEndorsement} from '~/components/ExpertEndorsement';
import {FitChecker} from '~/components/FitChecker';
import {Reveal} from '~/components/Reveal';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }

  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const featuredHandle =
    context.env.PUBLIC_FEATURED_PRODUCT_HANDLE ||
    'tb7-widest-grip-doorway-pull-up-bar';

  const [featuredProduct] = await Promise.all([
    context.storefront
      .query(FEATURED_PRODUCT_QUERY, {
        variables: {handle: featuredHandle},
      })
      .then((r) => r?.product)
      .catch(() => null),
  ]);

  return {
    featuredProduct,
    seo: seoPayload.home({url: request.url}),
  };
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  const seoEntries = matches.flatMap((match) => {
    const data: any = match.data;
    return data && data.seo ? [data.seo] : [];
  });
  return getSeoMeta(...seoEntries);
};

export default function Homepage() {
  const {featuredProduct} = useLoaderData<typeof loader>();

  return (
    <div className="homepage">
      {/* 1. Hero - Full-screen product in use, short headline, one CTA */}
      <HeroSection product={featuredProduct} />

      {/* 2. Problem → Solution → Proof (story + comparison merged) */}
      <ProblemSolutionSection />

      {/* 3. Key Feature Blocks - max 3 visual features */}
      <BuildHabitsSection />

      {/* 4. Interactive Fit Checker */}
      <FitChecker />

      {/* 5. Real People Section - user testimonials with photos */}
      <SocialProofSection />

      {/* 6. Expert Endorsements */}
      <ExpertEndorsement />

      {/* 7. Comparison Table - short, visual */}
      <ComparisonSection />

      {/* 8. Technical Specs + Guarantee */}
      <FeatureDetails />

      {/* 9. Trust Elements */}
      <TrustElementsSection />

      {/* 10. Final CTA - Lifestyle framing */}
      <NewsletterSection />

      {/* Sticky buy bar */}
      <StickyBuyBar product={featuredProduct} />
    </div>
  );
}

function HeroSection({product}: {product: any}) {
  const productHandle = product?.handle || 'tb7-widest-grip-doorway-pull-up-bar';
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    let raf = 0 as number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * 0.05;
        el.style.transform = `translateY(${y.toFixed(2)}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative bg-hero min-h-[85vh] flex items-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div ref={parallaxRef} className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[rgb(var(--color-accent))]/30 blur-3xl float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[rgb(var(--color-accent))]/20 blur-3xl float-slower"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20 w-full relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main headline */}
          <Reveal>
            <Heading as="h1" size="display" className="text-primary text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Setup in 10 seconds.<br/>
              Train anywhere.<br/>
              <span className="text-[rgb(var(--color-accent))]">No screws, no excuses.</span>
            </Heading>
          </Reveal>

          {/* Subtext */}
          <Reveal className="mt-8">
            <Text as="p" size="lead" className="text-primary/80 text-xl md:text-2xl max-w-3xl mx-auto">
              The TB7 pull-up bar transforms any doorframe into your personal gym. Wide 24" grip for shoulder safety. No damage, no installation, no compromises.
            </Text>
          </Reveal>

          {/* CTA */}
          <Reveal className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {product?.selectedOrFirstAvailableVariant?.id && (
                <AddToCartButton
                  width="auto"
                  variant="primary"
                  className="btn-accent text-lg px-10 py-4 hover-scale"
                  lines={[{merchandiseId: product.selectedOrFirstAvailableVariant.id, quantity: 1}]}
                  aria-label="Get TB7 - Add to cart"
                >
                  Get Yours Today — {product?.selectedOrFirstAvailableVariant?.price && <Money data={product.selectedOrFirstAvailableVariant.price} />}
                </AddToCartButton>
              )}
              <Link to={`/products/${productHandle}`} className="text-lg font-semibold text-primary/80 hover:text-[rgb(var(--color-accent))] transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          {/* Product image/video - centered below CTA */}
          <Reveal className="mt-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl glass-strong border border-[rgb(var(--color-accent))]/30 shadow-2xl">
                {(() => {
                  const vids = product?.media?.nodes?.filter((m: any) => m.__typename === 'Video') || [];
                  const src = vids[0]?.sources?.find((s: any) => /webm|mp4/.test(s.mimeType));
                  if (src?.url) {
                    return (
                      <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={product?.featuredImage?.url || ''}>
                        <source src={src.url} type={src.mimeType} />
                      </video>
                    );
                  }
                  if (product?.featuredImage?.url) {
                    return (
                      <img src={product.featuredImage.url} alt="TB7 Pull-Up Bar - Professional home gym equipment" className="h-full w-full object-cover" loading="eager" />
                    );
                  }
                  return (
                    <div className="flex h-full items-center justify-center bg-black/40">
                      <span className="text-primary/50">Product Media</span>
                    </div>
                  );
                })()}
              </div>
              {/* Social proof badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-strong rounded-full px-6 py-3 border border-[rgb(var(--color-accent))]/40">
                <div className="flex items-center gap-3">
                  <div className="text-yellow-400 text-lg">★★★★★</div>
                  <span className="text-sm font-semibold text-primary">4.8/5 from 2,347 athletes</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProblemSolutionSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Story intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Heading as="h2" size="heading" className="text-primary text-4xl md:text-5xl font-bold">
            We were tired of flimsy door bars that damage walls and wobble
          </Heading>
          <Text as="p" size="lead" className="mt-6 text-primary/80 text-lg">
            So we built one that feels solid and professional—because home training should feel real.
          </Text>
        </div>

        {/* Problem vs Solution grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Problem */}
          <div className="glass-tint rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-2xl">✗</span>
              </div>
              <h3 className="text-2xl font-bold text-primary">Generic Pull-Up Bars</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Narrow 18-20" grip causes shoulder pain',
                'Requires drilling holes in your doorframe',
                'Wobbles and feels unstable during use',
                'Basic foam that damages paint',
                'Rated for 150-200 lb (barely tested)',
                'One-size-fits-all = fits nothing well'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary/70">
                  <span className="text-[rgb(var(--color-accent))] mt-1">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="glass-strong rounded-2xl p-8 border border-[rgb(var(--color-accent))]/40 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-accent))]/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-accent))]/30 flex items-center justify-center">
                  <IconCheck className="w-6 h-6 text-[rgb(var(--color-accent))]" />
                </div>
                <h3 className="text-2xl font-bold text-primary">TB7 Pull-Up Bar</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Wide 24" grip for shoulder safety and comfort',
                  '10-second tool-free installation—no damage',
                  'Rock-solid stability, tested to 573 lb',
                  'Protective padding prevents all damage',
                  'Recommended 260 lb (real-world tested)',
                  'Adjustable 31.9–36.6" to fit your doorway'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-primary">
                    <IconCheck className="w-5 h-5 flex-shrink-0 text-[rgb(var(--color-accent))] mt-1" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildHabitsSection() {
  const features = [
    {
      title: 'Morning Activation',
      description: 'Start your day with 5 pull-ups. No excuses, no gym commute.',
      Icon: IconSun
    },
    {
      title: 'Travel Ready',
      description: 'Hotel door frames, AirBnB, anywhere. Fits in your luggage.',
      Icon: IconPlane
    },
    {
      title: 'Late Night Sessions',
      description: 'When inspiration hits at 11pm, your gym is already there.',
      Icon: IconMoon
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading as="h2" size="heading" className="text-primary text-4xl md:text-5xl font-bold">
            From morning pull-ups to late-night stretches
          </Heading>
          <Text as="p" size="lead" className="mt-6 text-primary/70 text-lg">
            TB7 moves with you. No commute. No crowds. Just consistent progress.
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="glass rounded-2xl p-8 text-center hover-lift">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[rgb(var(--color-accent))]/20 flex items-center justify-center border border-[rgb(var(--color-accent))]/30">
                  <feature.Icon className="w-8 h-8 text-[rgb(var(--color-accent))]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-primary/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <LifestyleTiles />
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const features = [
    {feature: 'Grip Width', tb7: '24"', tb7Check: true, generic: '18-20"', genericCheck: false},
    {feature: 'Installation', tb7: 'Tool-free, 10 sec', tb7Check: true, generic: 'Requires screws', genericCheck: false},
    {feature: 'Weight Capacity', tb7: '573 lb tested', tb7Check: true, generic: '150-200 lb', genericCheck: false},
    {feature: 'Door Protection', tb7: 'Pro padding', tb7Check: true, generic: 'Basic foam', genericCheck: false},
    {feature: 'Adjustable Fit', tb7: '31.9–36.6"', tb7Check: true, generic: 'One size', genericCheck: false},
    {feature: 'Patent Protected', tb7: 'Yes', tb7Check: true, generic: 'No', genericCheck: false}
  ];

  return (
    <section id="comparison" className="py-20 md:py-28 bg-gradient-to-b from-[#0A0A0A] to-black">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading as="h2" size="heading" className="text-primary text-4xl md:text-5xl font-bold">
            TB7 vs Generic Pull-Up Bars
          </Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70 text-lg">
            See what makes the difference
          </Text>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-5 text-left text-sm font-semibold text-primary/70 bg-black/40">Feature</th>
                <th className="px-6 py-5 text-center text-base font-bold text-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))]/10 border-l border-r border-[rgb(var(--color-accent))]/30">
                  TB7
                </th>
                <th className="px-6 py-5 text-center text-sm font-semibold text-primary/70 bg-black/40">Generic Bars</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, idx) => (
                <tr key={idx} className="border-b border-white/10 last:border-b-0">
                  <td className="px-6 py-4 text-sm font-medium text-primary bg-black/20">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center bg-[rgb(var(--color-accent))]/5 border-l border-r border-[rgb(var(--color-accent))]/20">
                    <div className="flex items-center justify-center gap-2">
                      <IconCheck className="w-5 h-5 text-[rgb(var(--color-accent))]" />
                      <span className="text-sm font-semibold text-primary">{row.tb7}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center bg-black/20">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-primary/50 text-lg">✗</span>
                      <span className="text-sm text-primary/60">{row.generic}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FeatureDetails() {
  const specs = [
    {label: 'Doorway Width', value: '31.9–36.6"', Icon: IconRuler},
    {label: 'Weight Capacity', value: '260 lb', subtext: 'Tested to 573 lb', Icon: IconDumbbell},
    {label: 'Grip Width', value: '24 inches', Icon: IconExpand},
    {label: 'Installation', value: '10 seconds', subtext: 'Tool-free', Icon: IconBolt},
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading as="h2" size="heading" className="text-primary text-4xl md:text-5xl font-bold">
            Technical Specifications
          </Heading>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {specs.map((spec) => (
            <div key={spec.label} className="glass rounded-2xl p-6 text-center border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-accent))]/20 flex items-center justify-center border border-[rgb(var(--color-accent))]/30">
                  <spec.Icon className="w-6 h-6 text-[rgb(var(--color-accent))]" />
                </div>
              </div>
              <dt className="text-sm font-medium text-primary/60 mb-2">{spec.label}</dt>
              <dd className="text-2xl font-bold text-primary">{spec.value}</dd>
              {spec.subtext && (
                <dd className="text-xs text-primary/50 mt-1">{spec.subtext}</dd>
              )}
            </div>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="glass-strong rounded-2xl p-8 md:p-10 border border-[rgb(var(--color-accent))]/40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-accent))]/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-accent))]/20 border-2 border-[rgb(var(--color-accent))]/40 mb-4">
                <IconShield className="w-8 h-8 text-[rgb(var(--color-accent))]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                30-Day Risk-Free Guarantee
              </h3>
              <p className="text-primary/70 text-lg max-w-2xl mx-auto mb-6">
                Try the TB7 for 30 days. If it doesn't transform your training routine, send it back for a full refund. No questions asked.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary/60">
                <span className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[rgb(var(--color-accent))]" /> Free returns
                </span>
                <span className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[rgb(var(--color-accent))]" /> 2-year warranty
                </span>
                <span className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-[rgb(var(--color-accent))]" /> Lifetime support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  const testimonials = [
    {
      name: 'Marcus Chen',
      role: 'Software Engineer',
      location: 'San Francisco',
      rating: 5,
      text: "I've tried 3 other pull-up bars and they all pinched my shoulders. The TB7's wide grip is a game-changer. I went from 2 pull-ups to 12 in 6 weeks.",
      result: '2 → 12 pull-ups in 6 weeks',
      initial: 'MC'
    },
    {
      name: 'Sarah Thompson',
      role: 'Physical Therapist',
      location: 'Austin',
      rating: 5,
      text: 'As a PT, I recommend this to all my patients. The shoulder-safe design prevents the internal rotation that causes impingement. Install takes 10 seconds.',
      initial: 'ST'
    },
    {
      name: 'David Rodriguez',
      role: 'Former Marine',
      location: 'Denver',
      rating: 5,
      text: "Holds 300lbs no problem. I do weighted pull-ups and it doesn't budge. The foam grips are bomb-proof. Worth every penny.",
      result: 'Supports 300+ lbs',
      initial: 'DR'
    }
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading as="h2" size="heading" className="text-primary text-4xl md:text-5xl font-bold">
            Loved by 10,000+ home athletes
          </Heading>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex text-yellow-400 text-2xl">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-xl font-bold text-primary">4.8/5</span>
            <span className="text-primary/70 text-lg">from 2,347 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="glass rounded-2xl p-6 border border-white/10 hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="flex text-yellow-400 text-lg">
                  {Array.from({length: testimonial.rating}).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  <IconCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>

              <p className="text-primary/85 leading-relaxed mb-4 italic">
                "{testimonial.text}"
              </p>

              {testimonial.result && (
                <div className="mb-4 bg-[rgb(var(--color-accent))]/10 rounded-lg px-3 py-2 text-sm font-semibold text-[rgb(var(--color-accent))]">
                  {testimonial.result}
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-accent))]/20 flex items-center justify-center text-primary font-semibold border border-[rgb(var(--color-accent))]/30">
                  {testimonial.initial}
                </div>
                <div>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-primary/70">{testimonial.role} · {testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-primary/60">All reviews from verified purchasers</p>
        </div>
      </div>
    </section>
  );
}

function TrustElementsSection() {
  const items = [
    {icon: <IconSparkle className="w-6 h-6 text-[rgb(var(--color-accent))]" />, title: 'Expert Support', description: 'Answers in < 24 hours'},
    {icon: <IconTruck className="w-6 h-6 text-[rgb(var(--color-accent))]" />, title: 'Free Shipping', description: 'On orders over $200'},
    {icon: <IconShield className="w-6 h-6 text-[rgb(var(--color-accent))]" />, title: '30-Day Trial', description: 'Risk-free returns'},
    {icon: <IconLock className="w-6 h-6 text-[rgb(var(--color-accent))]" />, title: 'Secure Checkout', description: 'SSL encrypted'},
  ];
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {items.map((it) => (
            <div key={it.title} className="flex items-center gap-3">
              {it.icon}
              <div>
                <div className="text-sm font-semibold text-primary leading-tight">{it.title}</div>
                <div className="text-xs text-primary/70 leading-tight">{it.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="glass-strong rounded-2xl p-8 md:p-12 border border-[rgb(var(--color-accent))]/40 text-center relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-accent))]/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <Heading as="h2" size="heading" className="text-primary text-3xl md:text-4xl font-bold">
              Join 10,000+ who train anywhere
            </Heading>
            <Text as="p" size="lead" className="mt-4 text-primary/70 text-lg">
              Get simple routines, setup guides, and exclusive offers delivered to your inbox.
            </Text>

            <div className="mt-8">
              <Newsletter
                title=""
                description=""
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-primary/60">
              <span className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-[rgb(var(--color-accent))]" /> Weekly workout tips
              </span>
              <span className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-[rgb(var(--color-accent))]" /> Early access deals
              </span>
              <span className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-[rgb(var(--color-accent))]" /> No spam, ever
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURED_PRODUCT_QUERY = `#graphql
  ${MEDIA_FRAGMENT}
  query FeaturedProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      featuredImage {
        url
        altText
        width
        height
      }
      media(first: 6) {
        nodes { ...Media }
      }
      selectedOrFirstAvailableVariant {
        id
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
` as const;


function StickyBuyBar({product}: {product: any}) {
  const {selectedOrFirstAvailableVariant} = product || {};
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!selectedOrFirstAvailableVariant || !show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:glass-strong bg-[#0B121C]/70 md:rounded-t-xl border-t border-white/10 p-3 block">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3 text-primary">
          <span className="text-sm">TB7</span>
          <span className="text-xl font-bold">
            {product?.selectedOrFirstAvailableVariant?.price && (<Money data={selectedOrFirstAvailableVariant.price} />)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <AddToCartButton
            variant="primary"
            className="btn-accent hover-scale"
            lines={[{merchandiseId: selectedOrFirstAvailableVariant.id, quantity: 1}]}
          >
            Add to Cart
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}
