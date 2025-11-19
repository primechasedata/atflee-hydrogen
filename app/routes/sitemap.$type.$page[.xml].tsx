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
    getLink: ({type, baseUrl, handle, locale}) => {
      // Make sure the generated sitemap urls are reflective of the routes
      const typeUrl = type === 'articles' ? 'journal' : type;

      if (!locale) return `${baseUrl}/${typeUrl}/${handle}`;
      return `/${locale}/${typeUrl}/${handle}`;
    },
  });

  response.headers.set('Oxygen-Cache-Control', `max-age=${60 * 60 * 24}`);
  response.headers.set('Vary', 'Accept-Encoding, Accept-Language');

  return response;
}
