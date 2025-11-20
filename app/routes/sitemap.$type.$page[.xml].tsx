import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {getSitemap} from 'app/lib/sitemap';

export async function loader({
  request,
  params,
  context: {storefront},
}: LoaderFunctionArgs) {
  const locales =
    storefront.i18n.locales?.map(
      (locale) =>
        `${locale.language.toLowerCase()}-${locale.country.toLowerCase()}`,
    ) ?? [];
  const response = await getSitemap({
    storefront,
    request,
    params,
    locales,
    getLink: ({type, baseUrl, handle, locale, blogHandle}) => {
      // Make sure the generated sitemap urls are reflective of the routes
      if (type === 'articles') {
        if (!locale) return `${baseUrl}/blogs/${blogHandle}/${handle}`;
        return `/${locale}/blogs/${blogHandle}/${handle}`;
      }
      
      const typeUrl = type;

      if (!locale) return `${baseUrl}/${typeUrl}/${handle}`;
      return `/${locale}/${typeUrl}/${handle}`;
    },
  });

  response.headers.set('Oxygen-Cache-Control', `max-age=${60 * 60 * 24}`);
  response.headers.set('Vary', 'Accept-Encoding, Accept-Language');

  return response;
}
