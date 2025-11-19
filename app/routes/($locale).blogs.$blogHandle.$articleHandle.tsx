import {
  json,
  type MetaArgs,
  type LinksFunction,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta, Image} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {PageHeader, Section} from '~/components/Text';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

import styles from '../styles/custom-font.css?url';

export const headers = routeHeaders;

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  invariant(params.blogHandle, 'Missing blog handle');
  invariant(params.articleHandle, 'Missing article handle');

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      articleHandle: params.articleHandle,
      language,
    },
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article?.publishedAt!));

  const seo = seoPayload.article({
    article,
    url: request.url,
    availableLocales: context.storefront.i18n.availableLocales,
    currentLocale: context.storefront.i18n,
  });

  return json({article, formattedDate, seo, blogHandle: params.blogHandle});
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Article() {
  const {article, formattedDate} = useLoaderData<typeof loader>();

  const {title, image, contentHtml, author} = article;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-16 md:py-24 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 !text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
        {article.title}
      </h2>
          <div className="flex items-center gap-4 text-white/90">
            {author?.name && (
              <span className="text-[rgb(var(--color-accent))] font-semibold">
                By {author.name}
              </span>
            )}
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <Section as="article" padding="x">
        <div className="mx-auto max-w-4xl">
          {image && (
            <Image
              data={image}
              className="w-full mx-auto mt-8 md:mt-16 rounded-xl"
              sizes="(min-width: 1024px) 896px, 90vw"
              loading="eager"
            />
          )}
          <div
            dangerouslySetInnerHTML={{__html: contentHtml}}
            className="article prose prose-invert prose-lg max-w-none mt-12 [&>h1]:!text-white [&>h2]:!text-white [&>h3]:!text-white"
          />
        </div>
      </Section>
    </div>
  );
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;
