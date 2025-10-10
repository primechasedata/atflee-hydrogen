import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {
  getPaginationVariables,
  getSeoMeta,
  Image,
  Money,
} from '@shopify/hydrogen';

import {PageHeader, Section, Heading, Text} from '~/components/Text';
import {ProductCard} from '~/components/ProductCard';
import {Grid} from '~/components/Grid';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Link} from '~/components/Link';
import {
  IconRuler,
  IconDumbbell,
  IconExpand,
  IconBolt,
} from '~/components/Icon';

const PAGE_BY = 8;

export const headers = routeHeaders;

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, {pageBy: PAGE_BY});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'Shop TB7 Pull-Up Bar',
      handle: 'products',
      descriptionHtml: 'The world\'s fastest setup pull-up bar. No screws, no damage, pure performance.',
      description: 'The world\'s fastest setup pull-up bar. No screws, no damage, pure performance.',
      seo: {
        title: 'Shop TB7 Pull-Up Bar | No-Screw Installation',
        description: 'The world\'s fastest setup pull-up bar. No screws, no damage, pure performance. Ships in 24 hours.',
      },
      metafields: [],
      products: data.products,
      updatedAt: '',
    },
  });

  return json({
    products: data.products,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();

  const firstProduct = products.nodes[0];
  const hasMultipleProducts = products.nodes.length > 1;

  // If only one product, show dedicated single-product experience
  if (!hasMultipleProducts && firstProduct) {
    return <SingleProductShop product={firstProduct} />;
  }

  // Fallback to grid for multiple products
  return (
    <>
      <PageHeader heading="Shop" />
      <Section>
        <Grid data-test="product-grid">
          {products.nodes.map((product: any, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={getImageLoadingPriority(i)}
            />
          ))}
        </Grid>
      </Section>
    </>
  );
}

function SingleProductShop({product}: {product: any}) {
  const selectedVariant = product.variants.nodes[0];
  const price = selectedVariant?.price;
  const compareAtPrice = selectedVariant?.compareAtPrice;
  const isOnSale = compareAtPrice && compareAtPrice.amount > price.amount;

  return (
    <div className="shop-single-product">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              {product.images?.nodes[0] && (
                <div className="glass-strong rounded-2xl overflow-hidden border border-white/10 hover-lift shimmer-on-hover">
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-auto"
                  />
                  {isOnSale && (
                    <div className="absolute top-4 right-4 bg-[rgb(var(--color-accent))] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      SAVE{' '}
                      {Math.round(
                        ((compareAtPrice.amount - price.amount) /
                          compareAtPrice.amount) *
                          100,
                      )}
                      %
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <Money
                  data={price}
                  className="text-4xl font-bold text-[rgb(var(--color-accent))]"
                />
                {isOnSale && compareAtPrice && (
                  <Money
                    data={compareAtPrice}
                    className="text-2xl text-gray-500 line-through"
                  />
                )}
              </div>

              {product.description && (
                <div className="prose prose-invert mb-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {Icon: IconBolt, label: '10-second setup'},
                  {Icon: IconRuler, label: 'Fits 31.9-36.6"'},
                  {Icon: IconDumbbell, label: '260 lb capacity'},
                  {Icon: IconExpand, label: 'No damage'},
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="glass rounded-lg p-4 flex items-center gap-3 hover:bg-white/5 transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgb(var(--color-accent))]/20 flex items-center justify-center text-[rgb(var(--color-accent))]">
                      <feature.Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <AddToCartButton
                  lines={[
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                    },
                  ]}
                  className="btn-accent !py-4 !px-8 text-lg w-full"
                >
                  Add to Cart — <Money data={price} />
                </AddToCartButton>

                <Link
                  to={`/products/${product.handle}`}
                  className="block text-center text-primary hover:text-[rgb(var(--color-accent))] transition-colors font-medium"
                >
                  View Full Details →
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">30</div>
                  <div className="text-sm text-gray-400">Day Guarantee</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24hr</div>
                  <div className="text-sm text-gray-400">Fast Shipping</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">2yr</div>
                  <div className="text-sm text-gray-400">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TB7 Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heading className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose TB7?
            </Heading>
            <Text className="text-lg text-gray-400 max-w-2xl mx-auto">
              The world's fastest setup pull-up bar. No screws, no damage, pure
              performance.
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Setup in Seconds',
                description:
                  'Extend, tighten, done. No tools, no holes, no hassle.',
                number: '01',
              },
              {
                title: 'Zero Damage',
                description:
                  'Foam-padded ends protect your door frame. Remove anytime.',
                number: '02',
              },
              {
                title: 'Built to Last',
                description:
                  'Tested to 573 lbs. 2-year warranty. 30-day money back.',
                number: '03',
              },
            ].map((item) => (
              <div
                key={item.number}
                className="glass rounded-2xl p-8 hover-lift shimmer-on-hover relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-[rgb(var(--color-accent))]/10">
                  {item.number}
                </div>
                <Heading className="text-xl font-bold text-primary mb-3 relative z-10">
                  {item.title}
                </Heading>
                <Text className="text-gray-400 relative z-10">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Product Images */}
      {product.images?.nodes.length > 1 && (
        <section className="py-16 md:py-24 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Heading className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              Product Gallery
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              {product.images.nodes.slice(1, 4).map((image: any, i: number) => (
                <div
                  key={i}
                  className="glass-strong rounded-xl overflow-hidden border border-white/10 hover-lift"
                >
                  <Image
                    data={image}
                    aspectRatio="4/3"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Heading className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Transform Your Training?
          </Heading>
          <Text className="text-lg text-gray-400 mb-8">
            Join thousands of athletes training smarter with TB7.
          </Text>
          <AddToCartButton
            lines={[
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
              },
            ]}
            className="btn-accent !py-4 !px-10 text-lg inline-block"
          >
            Add to Cart — <Money data={price} />
          </AddToCartButton>
        </div>
      </section>
    </div>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductCard
        description
        images(first: 10) {
          nodes {
            id
            url
            altText
            width
            height
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;
