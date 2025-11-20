import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {flattenConnection, getSeoMeta, Image} from '@shopify/hydrogen';

import {PageHeader, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Grid} from '~/components/Grid';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const {blogs} = await storefront.query(BLOGS_INDEX_QUERY, {
    variables: {
      language: storefront.i18n.language,
    },
  });

  if (!blogs) {
    throw new Response('Not found', {status: 404});
  }
  
  const seo = {
    title: 'Blogs',
    description: 'Read our latest articles and stories.',
  };

  return json({blogs: flattenConnection(blogs), seo});
};

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data.seo);
};

export default function Blogs() {
  const {blogs} = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader heading="Blogs" />
      <Section>
        <Grid as="ul" layout="blog">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.handle}`}>
                <h2 className="mt-4 font-medium">{blog.title}</h2>
              </Link>
            </li>
          ))}
        </Grid>
      </Section>
    </>
  );
}

const BLOGS_INDEX_QUERY = `#graphql
  query BlogsIndex(
    $language: LanguageCode
  ) @inContext(language: $language) {
    blogs(first: 10) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;
