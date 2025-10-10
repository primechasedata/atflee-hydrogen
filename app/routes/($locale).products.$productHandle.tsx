import {useRef, Suspense} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, Await} from '@remix-run/react';
import {
  getSeoMeta,
  Money,
  ShopPayButton,
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  getProductOptions,
  type MappedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';

import type {ProductFragment} from 'storefrontapi.generated';
import {Heading, Section, Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Skeleton} from '~/components/Skeleton';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {ProductGallery} from '~/components/ProductGallery';
import {FAQ} from '~/components/FAQ';
import {VideoSection} from '~/components/VideoSection';
import {IconCaret, IconCheck, IconClose} from '~/components/Icon';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import type {Storefront} from '~/lib/type';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {productHandle} = args.params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  params,
  request,
  context,
}: LoaderFunctionArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const [{shop, product}] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: productHandle,
        selectedOptions,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const selectedVariant = product.selectedOrFirstAvailableVariant ?? {};
  const variants = getAdjacentAndFirstAvailableVariants(product);

  const seo = seoPayload.product({
    product: {...product, variants},
    selectedVariant,
    url: request.url,
  });

  return {
    product,
    variants,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    seo,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(args: LoaderFunctionArgs) {
  // Put any API calls that are not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Product() {
  const {product, shop, recommended, variants, storeDomain} =
    useLoaderData<typeof loader>();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    variants,
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  return (
    <>
      {/* 1. Above the Fold - Hero Section */}
      <Section className="px-0 md:px-8 lg:px-12 bg-black">
        <div className="grid items-start md:gap-8 lg:gap-12 md:grid-cols-2">
          {/* Left: Image Carousel */}
          <ProductGallery
            media={media.nodes}
            className="w-full"
          />

          {/* Right: Product Summary + CTA */}
          <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section id="product-form" className="flex flex-col w-full gap-6 p-6 md:mx-auto md:px-4 bg-gradient-to-b from-gray-900/50 to-black/50 rounded-lg">
              {/* Product Title */}
              <div className="grid gap-2">
                <Heading as="h1" className="text-4xl md:text-5xl font-bold text-primary">
                  {title}
                </Heading>
                {vendor && (
                  <Text className="text-sm text-primary/60 font-medium tracking-wide uppercase">{vendor}</Text>
                )}
              </div>

              {/* Quick Specs Overlay */}
              <div className="grid grid-cols-2 gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                {[
                  {label: '40mm Comfort Grip', icon: '🤲'},
                  {label: 'Max Load: 500 lbs (Static) / 400 lbs (Dynamic)', icon: '💪'},
                  {label: 'Tool-Free Install', icon: '⚡'},
                  {label: 'Made in Korea', icon: '🇰🇷'},
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-primary/90">
                    <span className="text-lg">{spec.icon}</span>
                    <span className="font-medium leading-tight">{spec.label}</span>
                  </div>
                ))}
              </div>

              {/* Price Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-4">
                  {selectedVariant?.price && (
                    <Money
                      data={selectedVariant.price}
                      className="text-4xl font-bold text-[rgb(var(--color-accent))]"
                    />
                  )}
                  {isOnSale && selectedVariant?.compareAtPrice && (
                    <Money
                      data={selectedVariant.compareAtPrice}
                      className="text-2xl text-primary/40 line-through"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-primary/70">
                  <IconCheck className="w-4 h-4 text-green-400" />
                  <span>Free Shipping in the U.S.</span>
                </div>
                <div className="text-sm text-primary/70">
                  Ships within 24 hours • Arrives in 3-5 business days
                </div>
              </div>

              {/* Product Form */}
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
                storeDomain={storeDomain}
              />

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-yellow-400 text-xl mb-1">⭐⭐⭐⭐⭐</div>
                  <div className="text-sm font-semibold text-primary">4.9 Average</div>
                  <div className="text-xs text-primary/60">2,347 reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-sm font-semibold text-primary">13 Patents</div>
                  <div className="text-xs text-primary/60">Registered in Korea</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🩺</div>
                  <div className="text-sm font-semibold text-primary">PT Approved</div>
                  <div className="text-xs text-primary/60">Used by trainers</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Section>

      {/* 2. Product Story Section */}
      <Section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Engineered for Maximum Shoulder Safety. Built for Everyday Use.
          </Heading>

          <div className="prose prose-lg prose-invert max-w-none space-y-6">
            <p className="text-lg text-primary/80 leading-relaxed">
              The TB7 was developed in Seoul by engineers specializing in biomechanics. Unlike narrow bars that compress the shoulder joint, the TB7's 40mm grip distributes load evenly, supporting safer overhead motion. The wide stance reduces internal rotation stress, improving muscle recruitment in the lats, delts, and upper back.
            </p>
            <p className="text-lg text-primary/80 leading-relaxed">
              Every design decision prioritizes long-term joint health and sustainable training. From the precision-engineered friction-grip system to the medical-grade foam padding, the TB7 represents a new standard in home fitness equipment.
            </p>
          </div>

          {/* Biomechanics Diagram Placeholder */}
          <div className="mt-12 glass-strong rounded-2xl p-8 border border-[rgb(var(--color-accent))]/30">
            <div className="text-center">
              <Heading as="h3" className="text-2xl font-bold text-primary mb-4">
                Shoulder Angle Comparison
              </Heading>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="text-[rgb(var(--color-accent))] font-bold text-lg">TB7 - 40mm Grip</div>
                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                    <div className="text-sm text-primary/70 mb-2">Shoulder Internal Rotation</div>
                    <div className="text-3xl font-bold text-green-400">12°</div>
                    <div className="text-xs text-primary/60 mt-2">Optimal biomechanical alignment</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-primary/60 font-bold text-lg">Standard 28mm Bar</div>
                  <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                    <div className="text-sm text-primary/70 mb-2">Shoulder Internal Rotation</div>
                    <div className="text-3xl font-bold text-red-400">34°</div>
                    <div className="text-xs text-primary/60 mt-2">High impingement risk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Technical Specs Table */}
      <TechnicalSpecsSection />

      {/* 4. Visual Comparison Section */}
      <VisualComparisonSection />

      {/* 5. Video Demo Section */}
      <VideoSection variant="inline" />

      {/* 6. FAQ Section */}
      <Section className="py-16 md:py-24 bg-black">
        <FAQ variant="default" />
      </Section>

      {/* 7. Related Products / Cross-Sell */}
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <>
              {products?.nodes?.length > 0 && (
                <Section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                      <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Complete Your Home Gym
                      </Heading>
                      <Text className="text-lg text-primary/70 mb-6">
                        Save 10% when you bundle
                      </Text>
                    </div>
                    <ProductSwimlane products={products} />
                  </div>
                </Section>
              )}
            </>
          )}
        </Await>
      </Suspense>

      {/* 8. Brand Footer Section */}
      <BrandFooterSection />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

export function ProductForm({
  productOptions,
  selectedVariant,
  storeDomain,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  storeDomain: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        {productOptions.map((option, optionIndex) => (
          <div
            key={option.name}
            className="product-options flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
          >
            <Heading as="legend" size="lead" className="min-w-[4rem]">
              {option.name}
            </Heading>
            <div className="flex flex-wrap items-baseline gap-4">
              {option.optionValues.length > 7 ? (
                <div className="relative w-full">
                  <Listbox>
                    {({open}) => (
                      <>
                        <Listbox.Button
                          ref={closeRef}
                          className={clsx(
                            'flex items-center justify-between w-full py-3 px-4 border border-primary',
                            open
                              ? 'rounded-b md:rounded-t md:rounded-b-none'
                              : 'rounded',
                          )}
                        >
                          <span>
                            {
                              selectedVariant?.selectedOptions[optionIndex]
                                .value
                            }
                          </span>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Listbox.Button>
                        <Listbox.Options
                          className={clsx(
                            'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
                            open ? 'max-h-48' : 'max-h-0',
                          )}
                        >
                          {option.optionValues
                            .filter((value) => value.available)
                            .map(
                              ({
                                isDifferentProduct,
                                name,
                                variantUriQuery,
                                handle,
                                selected,
                              }) => (
                                <Listbox.Option
                                  key={`option-${option.name}-${name}`}
                                  value={name}
                                >
                                  <Link
                                    {...(!isDifferentProduct
                                      ? {rel: 'nofollow'}
                                      : {})}
                                    to={`/products/${handle}?${variantUriQuery}`}
                                    preventScrollReset
                                    className={clsx(
                                      'text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer',
                                      selected && 'bg-primary/10',
                                    )}
                                    onClick={() => {
                                      if (!closeRef?.current) return;
                                      closeRef.current.click();
                                    }}
                                  >
                                    {name}
                                    {selected && (
                                      <span className="ml-2">
                                        <IconCheck />
                                      </span>
                                    )}
                                  </Link>
                                </Listbox.Option>
                              ),
                            )}
                        </Listbox.Options>
                      </>
                    )}
                  </Listbox>
                </div>
              ) : (
                option.optionValues.map(
                  ({
                    isDifferentProduct,
                    name,
                    variantUriQuery,
                    handle,
                    selected,
                    available,
                    swatch,
                  }) => (
                    <Link
                      key={option.name + name}
                      {...(!isDifferentProduct ? {rel: 'nofollow'} : {})}
                      to={`/products/${handle}?${variantUriQuery}`}
                      preventScrollReset
                      prefetch="intent"
                      replace
                      className={clsx(
                        'leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200',
                        selected ? 'border-primary/50' : 'border-primary/0',
                        available ? 'opacity-100' : 'opacity-50',
                      )}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  ),
                )
              )}
            </div>
          </div>
        ))}
        {selectedVariant && (
          <div className="grid items-stretch gap-4">
            {isOutOfStock ? (
              <Button variant="secondary" disabled>
                <Text>Sold out</Text>
              </Button>
            ) : (
              <>
                <AddToCartButton
                  lines={[
                    {
                      merchandiseId: selectedVariant.id!,
                      quantity: 1,
                    },
                  ]}
                  variant="primary"
                  className="btn-accent !py-4 !text-lg font-bold"
                  data-test="add-to-cart"
                >
                  <Text
                    as="span"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Add to Cart</span> <span>·</span>{' '}
                    <Money
                      withoutTrailingZeros
                      data={selectedVariant?.price!}
                      as="span"
                      data-test="price"
                    />
                    {isOnSale && (
                      <Money
                        withoutTrailingZeros
                        data={selectedVariant?.compareAtPrice!}
                        as="span"
                        className="opacity-50 strike"
                      />
                    )}
                  </Text>
                </AddToCartButton>
                <ShopPayButton
                  width="100%"
                  variantIds={[selectedVariant?.id!]}
                  storeDomain={storeDomain}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="w-8 h-8"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}

function TechnicalSpecsSection() {
  const specs = [
    {feature: 'Grip Diameter', detail: '40mm (Ergo Comfort Grip)'},
    {feature: 'Door Compatibility', detail: '31.9–36.6 inches width'},
    {feature: 'Installation', detail: 'Tool-free pressure fit, removable in 10 seconds'},
    {feature: 'Materials', detail: 'High-Grade Steel Frame, PU Foam Grip'},
    {feature: 'Weight Capacity', detail: '500 lbs (Static) / 400 lbs (Dynamic)'},
    {feature: 'Finish', detail: 'Powder-coated matte black'},
    {feature: 'Country of Origin', detail: 'South Korea'},
    {feature: 'Warranty', detail: '2 years manufacturer warranty'},
  ];

  return (
    <Section className="py-16 md:py-24 bg-gray-900">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
          Technical Specifications
        </Heading>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full">
            <thead className="bg-black/40">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary/70 uppercase tracking-wide">
                  Feature
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary/70 uppercase tracking-wide">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-white/10 ${
                    idx % 2 === 0 ? 'bg-white/5' : 'bg-black/20'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-primary/90">
                    {spec.feature}
                  </td>
                  <td className="px-6 py-4 text-sm text-primary font-semibold">
                    {spec.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

function VisualComparisonSection() {
  const comparisons = [
    {
      category: 'Grip Width',
      tb7: '40mm ergonomic',
      generic: '25–30mm hard foam',
    },
    {
      category: 'Shoulder Stress',
      tb7: 'Low (neutral grip design)',
      generic: 'High (internal rotation)',
    },
    {
      category: 'Assembly',
      tb7: 'No screws needed',
      generic: 'Requires tools',
    },
    {
      category: 'Frame Protection',
      tb7: 'Premium foam pads',
      generic: 'Bare metal ends',
    },
    {
      category: 'Weight Capacity',
      tb7: '500 lbs (Static) / 400 lbs (Dynamic)',
      generic: '150-200 lbs',
    },
    {
      category: 'Warranty',
      tb7: '2 years',
      generic: '90 days',
    },
  ];

  return (
    <Section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          How TB7 Outperforms Common Door Bars
        </Heading>
        <Text className="text-lg text-primary/70 mb-12 text-center max-w-2xl mx-auto">
          See the engineering difference that makes TB7 the choice of physical therapists and serious athletes
        </Text>

        {/* Mobile: Scrollable cards */}
        <div className="md:hidden space-y-4 overflow-x-auto pb-4">
          {comparisons.map((item, idx) => (
            <div key={idx} className="glass rounded-xl p-4 border border-white/10 min-w-[280px]">
              <div className="font-bold text-primary mb-3">{item.category}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[rgb(var(--color-accent))] font-semibold mb-1">TB7</div>
                  <div className="text-primary/80">{item.tb7}</div>
                </div>
                <div>
                  <div className="text-primary/50 font-semibold mb-1">Generic</div>
                  <div className="text-primary/60">{item.generic}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[rgb(var(--color-accent))]/20 to-transparent border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Category
                </th>
                <th className="px-6 py-4 text-center bg-[rgb(var(--color-accent))]/10 border-l border-r border-[rgb(var(--color-accent))]/30">
                  <div className="text-lg font-bold text-[rgb(var(--color-accent))]">TB7</div>
                  <div className="text-xs text-primary/60">Engineered in Korea</div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-primary/70">
                  Generic Door Bars
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-white/10 ${
                    idx % 2 === 0 ? 'bg-white/5' : 'bg-black/20'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 text-center bg-[rgb(var(--color-accent))]/5 border-l border-r border-[rgb(var(--color-accent))]/20">
                    <div className="flex items-center justify-center gap-2">
                      <IconCheck className="w-5 h-5 text-[rgb(var(--color-accent))]" />
                      <span className="text-sm font-semibold text-primary">{row.tb7}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-primary/60">{row.generic}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

function BrandFooterSection() {
  return (
    <Section className="py-16 md:py-24 bg-black border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Trahere
        </Heading>
        <Text className="text-lg text-primary/70 mb-8 max-w-2xl mx-auto">
          Premium Fitness Equipment Engineered in Korea.
          <br />
          Trusted by athletes, used in homes worldwide.
        </Text>

        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-primary/80">
            <span className="text-2xl">🇰🇷</span>
            <span className="font-semibold">Made in Korea</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary/80">
            <span className="text-2xl">📜</span>
            <span className="font-semibold">Patent Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary/80">
            <span className="text-2xl">♻️</span>
            <span className="font-semibold">Sustainable Packaging</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
    media(first: 7) {
      nodes {
        ...Media
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_FRAGMENT}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}
