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
import {IconCheck, IconShield, IconTruck, IconSparkle, IconLock} from '~/components/Icon';
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
      {/* 1. Hook - Hero Section */}
      <HeroSection product={featuredProduct} />

      {/* 2. Problem & Solution - Product Highlight */}
      <ProductHighlight product={featuredProduct} />

      {/* 3. Origin Story - Why we built this */}
      <OriginStory />

      {/* 4. Comparison - Problem vs Solution */}
      <ComparisonSection />

      {/* 5. Interactive Fit Checker */}
      <FitChecker />

      {/* 6. Key Benefits - Use Cases */}
      <BuildHabitsSection />

      {/* 7. Development Timeline */}
      <ProductTimeline />

      {/* 8. Technical Specifications */}
      <FeatureDetails />

      {/* 9. Expert Endorsements */}
      <ExpertEndorsement />

      {/* 10. Social Proof - Customer Testimonials */}
      <SocialProofSection />

      {/* 11. Trust Elements */}
      <TrustElementsSection />

      {/* 12. Final CTA - Newsletter */}
      <NewsletterSection />
      {/* Sticky buy bar */}
      <StickyBuyBar product={featuredProduct} />
    </div>
  );
}

function HeroSection({product}: {product: any}) {
  const productHandle = product?.handle || 'tb7-widest-grip-doorway-pull-up-bar';
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rx = dy * -6;
      const ry = dx * 6;
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="relative bg-hero py-20 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div ref={parallaxRef} className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[rgb(var(--color-accent))]/20 blur-3xl float-slow"></div>
        <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-white/5 blur-3xl float-slower"></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Glass Text Card */}
          <Reveal className="max-w-2xl">
            <div className="glass rounded-2xl p-6 md:p-8">
              <Heading as="h1" size="display" className="text-primary">Transform your doorframe into a personal gym</Heading>
              <Text as="p" size="lead" className="mt-4 text-primary/70">Wide 24" grip • Tool-free install • Fits most doorways • Protective padding • 260 lb capacity (tested to 573 lb)</Text>
              <StatChips />
              <div className="mt-8 flex items-center gap-4">
                <Link to={`/products/${productHandle}`} className="btn-accent hover-scale">
                  Shop TB7
                </Link>
                <a href="#comparison" className="text-base font-semibold leading-7 text-primary hover:text-[rgb(var(--color-accent))] transition-colors">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column - Visual */}
          <Reveal className="relative">
            <div ref={tiltRef} className="aspect-[4/3] overflow-hidden rounded-2xl glass-soft ring-1 ring-white/10 will-tilt">
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
                    <img src={product.featuredImage.url} alt="TB7 Pull-Up Bar installed in doorway" className="h-full w-full object-cover" loading="eager" />
                  );
                }
                return (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-primary/50">Product Media</span>
                  </div>
                );
              })()}
              {/* Price card overlay */}
              <div className="absolute bottom-4 left-4 right-auto glass-strong stroke-gradient rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="text-yellow-300">★★★★★</div>
                  {product?.selectedOrFirstAvailableVariant?.price && (
                    <div className="text-xl font-bold text-primary flex items-baseline gap-2">
                      <Money data={product.selectedOrFirstAvailableVariant.price} />
                      <span className="text-xs text-primary/70">Free shipping</span>
                    </div>
                  )}
                </div>
                {product?.selectedOrFirstAvailableVariant?.id && (
                  <div className="mt-2">
                    <AddToCartButton
                      width="full"
                      variant="primary"
                      className="btn-accent w-full hover-scale"
                      lines={[{merchandiseId: product.selectedOrFirstAvailableVariant.id, quantity: 1}]}
                      aria-label="Add TB7 to cart"
                    >
                      Add to Cart
                    </AddToCartButton>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        </div>
    </section>
  );
}

function ProductHighlight({product}: {product: any}) {
  if (!product) return null;

  const price = product.selectedOrFirstAvailableVariant?.price;
  const compareAtPrice = product.selectedOrFirstAvailableVariant?.compareAtPrice;
  const productHandle = product.handle;
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="glass rounded-2xl p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">{product.title}</h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span className="text-sm text-primary/70">4.8/5 (2,347 reviews)</span>
              </div>
            </div>
            <div className="text-right">
              {compareAtPrice && (
                <p className="text-sm text-primary/60 line-through">
                  <Money data={compareAtPrice} />
                </p>
              )}
              {price && (
                <p className="text-3xl font-bold text-primary">
                  <Money data={price} />
                </p>
              )}
              {compareAtPrice && price && (
                <span className="inline-block mt-1 rounded-full bg-[rgb(var(--color-accent))]/10 px-3 py-1 text-sm font-semibold text-[rgb(var(--color-accent))]">
                  Save {Math.round(((parseFloat(compareAtPrice.amount) - parseFloat(price.amount)) / parseFloat(compareAtPrice.amount)) * 100)}%
                </span>
              )}
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {[
              'Wide 24-inch grip for shoulder safety',
              '10-second tool-free installation',
              'Fits doorways 31.9–36.6 inches',
              'Tested to 573 lb capacity',
              'Protective padding prevents damage',
              'Adjustable width for perfect fit'
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <IconCheck className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                <span className="text-primary/80">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4">
            <Link
              to={`/products/${productHandle}`}
              className="block w-full text-center btn-accent hover-scale"
            >
              Buy Now
            </Link>
            <div className="flex items-center justify-center gap-6 text-sm text-primary/70">
              <span className="flex items-center gap-1">
                <IconCheck className="h-4 w-4" /> Free shipping over $200
              </span>
              <span className="flex items-center gap-1">
                <IconCheck className="h-4 w-4" /> 30-day trial
              </span>
              <span className="flex items-center gap-1">
                <IconCheck className="h-4 w-4" /> Secure checkout
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function BuildHabitsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <Heading as="h2" size="heading" className="text-primary">Build habits anywhere</Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70">No commute. No crowds. Just consistent progress.</Text>
        </div>

        <LifestyleTiles />

        <div className="mt-10 text-center">
          <Link to="/pages/education" className="inline-flex items-center text-base font-semibold text-[rgb(var(--color-accent))] hover:text-primary">
            Explore workout plans
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

function ComparisonSection() {
  const features = [
    {feature: 'Grip Width', tb7: '24 inches', generic: '18-20 inches'},
    {feature: 'Installation', tb7: 'Tool-free', generic: 'Requires screws'},
    {feature: 'Weight Capacity', tb7: '260 lb (tested 573 lb)', generic: '150-200 lb'},
    {feature: 'Door Protection', tb7: 'Protective padding', generic: 'Basic foam'},
    {feature: 'Patent Protection', tb7: 'Yes', generic: 'No'}
  ];

  return (
    <section id="comparison" className="py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <Heading as="h2" size="heading" className="text-primary">TB7 vs Generic Pull-Up Bars</Heading>
          <Text as="p" size="lead" className="mt-4 text-primary/70">See what makes the TB7 different</Text>
        </div>

        <div className="mt-12 overflow-x-auto rounded-xl glass-tint">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary sticky left-0 bg-white/5 backdrop-blur">Feature</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[rgb(var(--color-accent))] sticky top-0 bg-white/5">TB7</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary sticky top-0 bg-white/5">Generic Bars</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {features.map((row, idx) => (
                <tr key={idx} className="">
                  <td className="px-6 py-4 text-sm font-medium text-primary/90 whitespace-nowrap sticky left-0 bg-white/5 backdrop-blur">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-primary font-semibold bg-white/5 whitespace-nowrap">{row.tb7}</td>
                  <td className="px-6 py-4 text-sm text-primary/70 whitespace-nowrap">{row.generic}</td>
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
    {label: 'Doorway Width', value: '31.9–36.6 inches'},
    {label: 'Recommended Capacity', value: '260 lb'},
    {label: 'Tested Capacity', value: '573 lb'},
    {label: 'Grip Width', value: '24 inches'},
    {label: 'Installation', value: 'Tool-free (10 seconds)'},
    {label: 'Warranty', value: '2 years'},
  ];
  const primary = specs.slice(0, 4);
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading as="h2" size="heading" className="text-primary">Technical Specifications</Heading>
        </div>
        <div className="glass-strong stroke-gradient rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {primary.map((spec) => (
              <div key={spec.label} className="px-2">
                <dt className="text-sm font-medium text-primary/70 truncate">{spec.label}</dt>
                <dd className="mt-2 text-xl font-bold text-primary truncate">{spec.value}</dd>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function SocialProofSection() {
  const testimonials = [
    {
      name: 'Mike R.',
      location: 'Austin, TX',
      rating: 5,
      text: 'The wide grip is a game-changer. No more shoulder pain, and I can finally do pull-ups daily.'
    },
    {
      name: 'Sarah K.',
      location: 'Portland, OR',
      rating: 5,
      text: 'Installation took literally 10 seconds. So much easier than the screw-in bar I had before.'
    },
    {
      name: 'David L.',
      location: 'Chicago, IL',
      rating: 5,
      text: 'Worth every penny. Feels rock-solid and the padding protects my door frame perfectly.'
    }
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <Heading as="h2" size="heading" className="text-primary">What customers are saying</Heading>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-yellow-400 text-xl">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-lg font-semibold text-primary">4.8/5</span>
            <span className="text-primary/70">(2,347 reviews)</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {list.slice(0, count).map((testimonial, idx) => (
            <div key={idx} className="glass-soft rounded-xl p-6 ring-1 ring-white/10 hover-lift">
              <div className="flex text-yellow-400 mb-3">
                {Array.from({length: testimonial.rating}).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-primary/85 italic">"{testimonial.text}"</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-primary/70">{testimonial.location}</p>
              </div>
            </div>
          ))}
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
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="glass rounded-2xl p-6 md:p-8">
          <Newsletter
            title="Get fitness tips & exclusive deals"
            description="Join our community and never miss a workout tip or special offer."
          />
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
