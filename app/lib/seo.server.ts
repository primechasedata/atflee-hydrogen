import {type SeoConfig} from '@shopify/hydrogen';
import type {
  Article,
  Blog,
  Collection,
  Page,
  Product,
  ProductVariant,
  ShopPolicy,
  Image,
} from '@shopify/hydrogen/storefront-api-types';
import type {
  Article as SeoArticle,
  BreadcrumbList,
  Blog as SeoBlog,
  CollectionPage,
  Offer,
  Organization,
  Product as SeoProduct,
  WebPage,
} from 'schema-dts';

import type {ShopFragment} from 'storefrontapi.generated';

// Default OG image for social sharing when page doesn't have a specific image
const DEFAULT_OG_IMAGE = 'https://cdn.shopify.com/s/files/1/0632/1383/0231/files/trahere-og-image.png?v=1760283677';

const MAX_TITLE_LENGTH = 60;

function truncateTitle(str: string): string {
  return truncate(str, MAX_TITLE_LENGTH);
}

function root({
  shop,
  url,
}: {
  shop: ShopFragment;
  url: Request['url'];
}): SeoConfig {
  return {
    title: truncateTitle('Trahere'),
    titleTemplate: '%s | Trahere',
    description: 'Premium doorway pull-up bars engineered for serious training. Tool-free installation, 500 lb capacity, 1-year warranty. Transform any doorway into your training space.',
    handle: '@trahere_us',
    url,
    robots: {
      noIndex: false,
      noFollow: false,
    },
    media: {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: 'Trahere - Premium Doorway Pull-Up Bars',
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Trahere',
      logo: shop.brand?.logo?.image?.url,
      sameAs: [
        'https://instagram.com/trahere_us',
      ],
      url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${url}search?q={search_term}`,
        query: "required name='search_term'",
      },
    },
  };
}

function home({url}: {url: Request['url']}): SeoConfig {
  return {
    title: truncateTitle('Premium Doorway Pull-Up Bars | TB7 Widest Grip Bar'),
    titleTemplate: '%s | Trahere',
    description: 'Transform any doorway into your training space with the TB7 pull-up bar. 40mm comfort grip, tool-free installation, 500 lb capacity. 30-day money-back guarantee.',
    url,
    robots: {
      noIndex: false,
      noFollow: false,
    },
    media: {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: 'Trahere TB7 Pull-Up Bar - Premium Home Fitness Equipment',
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Home',
    },
  };
}

type SelectedVariantRequiredFields = Pick<ProductVariant, 'sku'> & {
  image?: null | Partial<Image>;
};

type ProductRequiredFields = Pick<
  Product,
  'title' | 'description' | 'vendor' | 'seo'
> & {
  variants: Array<
    Pick<
      ProductVariant,
      'sku' | 'price' | 'selectedOptions' | 'availableForSale'
    >
  >;
};

function productJsonLd({
  product,
  selectedVariant,
  url,
}: {
  product: ProductRequiredFields;
  selectedVariant: SelectedVariantRequiredFields;
  url: Request['url'];
}): SeoConfig['jsonLd'] {
  const origin = new URL(url).origin;
  const variants = product.variants;
  const description = truncate(
    product?.seo?.description ?? product?.description,
  );
  const offers: Offer[] = (variants || []).map((variant) => {
    const variantUrl = new URL(url);
    for (const option of variant.selectedOptions) {
      variantUrl.searchParams.set(option.name, option.value);
    }
    const availability = variant.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';

    return {
      '@type': 'Offer',
      availability,
      price: parseFloat(variant.price.amount),
      priceCurrency: variant.price.currencyCode,
      sku: variant?.sku ?? '',
      url: variantUrl.toString(),
    };
  });
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Products',
          item: `${origin}/products`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: product.title,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      brand: {
        '@type': 'Brand',
        name: product.vendor,
      },
      description,
      image: [selectedVariant?.image?.url ?? ''],
      name: product.title,
      offers,
      sku: selectedVariant?.sku ?? '',
      url,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '2347',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ];
}

function product({
  product,
  url,
  selectedVariant,
}: {
  product: ProductRequiredFields;
  selectedVariant: SelectedVariantRequiredFields;
  url: Request['url'];
}): SeoConfig {
  const description = truncate(
    product?.seo?.description ?? product?.description ?? '',
  );
  return {
    title: truncateTitle(product?.seo?.title ?? product?.title ?? ''),
    description,
    url,
    media: selectedVariant?.image || {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: product.title,
    },
    jsonLd: productJsonLd({product, selectedVariant, url}),
  };
}

type CollectionRequiredFields = Omit<
  Collection,
  'products' | 'descriptionHtml' | 'metafields' | 'image' | 'updatedAt'
> & {
  products: {nodes: Pick<Product, 'handle'>[]};
  image?: null | Pick<Image, 'url' | 'height' | 'width' | 'altText'>;
  descriptionHtml?: null | Collection['descriptionHtml'];
  updatedAt?: null | Collection['updatedAt'];
  metafields?: null | Collection['metafields'];
};

function collectionJsonLd({
  url,
  collection,
}: {
  url: Request['url'];
  collection: CollectionRequiredFields;
}): SeoConfig['jsonLd'] {
  const siteUrl = new URL(url);
  const itemListElement: CollectionPage['mainEntity'] =
    collection.products.nodes.map((product, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `/products/${product.handle}`,
      };
    });

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Collections',
          item: `${siteUrl.host}/collections`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: collection.title,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: collection?.seo?.title ?? collection?.title ?? '',
      description: truncate(
        collection?.seo?.description ?? collection?.description ?? '',
      ),
      image: collection?.image?.url,
      url: `/collections/${collection.handle}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement,
      },
    },
  ];
}

function collection({
  collection,
  url,
}: {
  collection: CollectionRequiredFields;
  url: Request['url'];
}): SeoConfig {
  return {
    title: truncateTitle(collection?.seo?.title ?? collection?.title ?? ''),
    description: truncate(
      collection?.seo?.description ?? collection?.description ?? '',
    ),
    titleTemplate: '%s | Collection',
    url,
    media: {
      type: 'image',
      url: collection?.image?.url || DEFAULT_OG_IMAGE,
      height: collection?.image?.height || 1200,
      width: collection?.image?.width || 1200,
      altText: collection?.image?.altText || collection.title,
    },
    jsonLd: collectionJsonLd({collection, url}),
  };
}

type CollectionListRequiredFields = {
  nodes: Omit<CollectionRequiredFields, 'products'>[];
};

function collectionsJsonLd({
  url,
  collections,
}: {
  url: Request['url'];
  collections: CollectionListRequiredFields;
}): SeoConfig['jsonLd'] {
  const itemListElement: CollectionPage['mainEntity'] = collections.nodes.map(
    (collection, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `/collections/${collection.handle}`,
      };
    },
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Collections',
    description: 'All collections',
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement,
    },
  };
}

function listCollections({
  collections,
  url,
}: {
  collections: CollectionListRequiredFields;
  url: Request['url'];
}): SeoConfig {
  return {
    title: truncateTitle('Shop Pull-Up Bars'),
    titleTemplate: '%s | Trahere',
    description: 'Browse our collection of premium doorway pull-up bars. Professional-grade equipment for home training.',
    url,
    media: {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: 'Trahere Pull-Up Bar Collection',
    },
    jsonLd: collectionsJsonLd({collections, url}),
  };
}

function article({
  article,
  url,
}: {
  article: Pick<
    Article,
    'title' | 'contentHtml' | 'seo' | 'publishedAt' | 'excerpt'
  > & {
    image?: null | Pick<
      NonNullable<Article['image']>,
      'url' | 'height' | 'width' | 'altText'
    >;
  };
  url: Request['url'];
}): SeoConfig {
  return {
    title: truncateTitle(article?.seo?.title ?? article?.title ?? ''),
    description: truncate(article?.seo?.description ?? article?.excerpt ?? ''),
    titleTemplate: '%s | Trahere',
    url,
    media: {
      type: 'image',
      url: article?.image?.url || DEFAULT_OG_IMAGE,
      height: article?.image?.height || 1200,
      width: article?.image?.width || 1200,
      altText: article?.image?.altText || article.title,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      alternativeHeadline: article.title,
      articleBody: article.contentHtml,
      datePublished: article?.publishedAt,
      dateModified: article?.publishedAt,
      description: truncate(
        article?.seo?.description || article?.excerpt || '',
      ),
      headline: article?.seo?.title || '',
      image: article?.image?.url || DEFAULT_OG_IMAGE,
      url,
      author: {
        '@type': 'Organization',
        name: 'Trahere',
        url: 'https://trahere.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Trahere',
        logo: {
          '@type': 'ImageObject',
          url: 'https://cdn.shopify.com/s/files/1/0632/1383/0231/files/trahere-favicon4.png?v=1757624859',
        },
      },
    },
  };
}

function blog({
  blog,
  url,
}: {
  blog: Pick<Blog, 'seo' | 'title'>;
  url: Request['url'];
}): SeoConfig {
  return {
    title: truncateTitle(blog?.seo?.title ?? blog?.title ?? ''),
    description: truncate(blog?.seo?.description || ''),
    titleTemplate: '%s | Trahere',
    url,
    media: {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: 'Trahere Blog - Training Tips and Product Guides',
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: blog?.seo?.title || blog?.title || '',
      description: blog?.seo?.description || '',
      url,
    },
  };
}

function page({
  page,
  url,
}: {
  page: Pick<Page, 'title' | 'seo'>;
  url: Request['url'];
}): SeoConfig {
  return {
    description: truncate(page?.seo?.description || ''),
    title: truncateTitle(page?.seo?.title ?? page?.title ?? ''),
    titleTemplate: '%s | Trahere',
    url,
    media: {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: `Trahere - ${page.title}`,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
    },
  };
}

function policy({
  policy,
  url,
}: {
  policy: Pick<ShopPolicy, 'title' | 'body'>;
  url: Request['url'];
}): SeoConfig {
  return {
    description: truncate(policy?.body ?? ''),
    title: truncateTitle(policy?.title ?? ''),
    titleTemplate: '%s | Trahere',
    url,
    media: {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: `Trahere - ${policy.title}`,
    },
  };
}

function policies({
  policies,
  url,
}: {
  policies: Array<Pick<ShopPolicy, 'title' | 'handle'>>;
  url: Request['url'];
}): SeoConfig {
  const origin = new URL(url).origin;
  const itemListElement: BreadcrumbList['itemListElement'] = policies
    .filter(Boolean)
    .map((policy, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: policy.title,
        item: `${origin}/policies/${policy.handle}`,
      };
    });
  return {
    title: truncateTitle('Store Policies'),
    titleTemplate: '%s | Trahere',
    description: 'Trahere store policies including shipping, returns, refunds, privacy, and terms of service.',
    media: {
      type: 'image',
      url: DEFAULT_OG_IMAGE,
      height: 1200,
      width: 1200,
      altText: 'Trahere Store Policies',
    },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        description: 'Trahere store policies',
        name: 'Policies',
        url,
      },
    ],
  };
}

export const seoPayload = {
  article,
  blog,
  collection,
  home,
  listCollections,
  page,
  policies,
  policy,
  product,
  root,
};

/**
 * Truncate a string to a given length, adding an ellipsis if it was truncated
 * @param str - The string to truncate
 * @param num - The maximum length of the string
 * @returns The truncated string
 * @example
 * ```js
 * truncate('Hello world', 5) // 'Hello...'
 * ```
 */
function truncate(str: string, num = 155): string {
  if (typeof str !== 'string') return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num - 3) + '...';
}
