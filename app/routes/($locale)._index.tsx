import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta, Money} from '@shopify/hydrogen';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {IconCheck} from '~/components/Icon';
import {Newsletter} from '~/components/Newsletter';

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
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const {featuredProduct} = useLoaderData<typeof loader>();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroSection product={featuredProduct} />

      {/* Product Highlight */}
      <ProductHighlight product={featuredProduct} />

      {/* Build Habits Section */}
      <BuildHabitsSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Feature Details */}
      <FeatureDetails />

      {/* Social Proof / Testimonials */}
      <SocialProofSection />

      {/* Support and Trust Elements */}
      <TrustElementsSection />

      {/* Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
}

function HeroSection({product}: {product: any}) {
  const productHandle = product?.handle || 'tb7-widest-grip-doorway-pull-up-bar';

  return (
    <section className="relative bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Transform your doorframe into a personal gym
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Wide 24" grip • Tool-free installation in 10 seconds • Fits most doorways • Protective padding • 260 lb capacity (tested to 573 lb)
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to={`/products/${productHandle}`}
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Shop TB7
              </Link>
              <a
                href="#comparison"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-blue-600 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              {product?.featuredImage?.url ? (
                <img
                  src={product.featuredImage.url}
                  alt="TB7 Pull-Up Bar installed in doorway"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-200">
                  <span className="text-gray-400">Product Image</span>
                </div>
              )}
            </div>
          </div>
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
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8/5 (2,347 reviews)</span>
              </div>
            </div>
            <div className="text-right">
              {compareAtPrice && (
                <p className="text-sm text-gray-500 line-through">
                  <Money data={compareAtPrice} />
                </p>
              )}
              {price && (
                <p className="text-3xl font-bold text-gray-900">
                  <Money data={price} />
                </p>
              )}
              {compareAtPrice && price && (
                <span className="inline-block mt-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
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
                <IconCheck className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4">
            <Link
              to={`/products/${productHandle}`}
              className="block w-full rounded-md bg-blue-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </Link>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
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
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Build habits anywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No commute. No crowds. Just consistent progress.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Morning routine',
              description: '3 minutes to stronger shoulders. Start your day with energy.',
              icon: '☀️'
            },
            {
              title: 'Evening wind-down',
              description: 'Build upper body strength while you decompress from the day.',
              icon: '🌙'
            },
            {
              title: 'Anywhere, anytime',
              description: 'Install in seconds, train for minutes, remove instantly.',
              icon: '🏠'
            }
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-8 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/pages/education"
            className="inline-flex items-center text-base font-semibold text-blue-600 hover:text-blue-700"
          >
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
    <section id="comparison" className="py-16 bg-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            TB7 vs Generic Pull-Up Bars
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See what makes the TB7 different
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 bg-blue-50">TB7</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Generic Bars</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {features.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 bg-blue-50/50 font-semibold">{row.tb7}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.generic}</td>
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
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Technical Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {label: 'Doorway Width', value: '31.9–36.6 inches'},
            {label: 'Recommended Capacity', value: '260 lb'},
            {label: 'Tested Capacity', value: '573 lb'},
            {label: 'Grip Width', value: '24 inches'},
            {label: 'Installation', value: 'Tool-free (10 seconds)'},
            {label: 'Warranty', value: '2 years'}
          ].map((spec) => (
            <div key={spec.label} className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <dt className="text-sm font-medium text-gray-600">{spec.label}</dt>
              <dd className="mt-2 text-2xl font-bold text-gray-900">{spec.value}</dd>
            </div>
          ))}
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
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What customers are saying
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-yellow-400 text-xl">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.8/5</span>
            <span className="text-gray-600">(2,347 reviews)</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="rounded-xl bg-gray-50 p-6 border border-gray-200">
              <div className="flex text-yellow-400 mb-3">
                {Array.from({length: testimonial.rating}).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustElementsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {[
            {icon: '🎯', title: 'Expert Support', description: 'Answers in < 24 hours'},
            {icon: '📦', title: 'Free Shipping', description: 'On orders over $200'},
            {icon: '✅', title: '30-Day Trial', description: 'Risk-free returns'},
            {icon: '🔒', title: 'Secure Checkout', description: 'SSL encrypted'}
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <Newsletter
          title="Get fitness tips & exclusive deals"
          description="Join our community and never miss a workout tip or special offer."
        />
      </div>
    </section>
  );
}

const FEATURED_PRODUCT_QUERY = `#graphql
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
