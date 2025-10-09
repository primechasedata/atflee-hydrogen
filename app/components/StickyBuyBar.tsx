import {useState, useEffect} from 'react';
import {Money} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import type {ProductFragment} from 'storefrontapi.generated';

export function StickyBuyBar({
  selectedVariant,
  productTitle,
}: {
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  productTitle: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 400px down
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!selectedVariant) return null;

  const isOutOfStock = !selectedVariant?.availableForSale;
  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 lg:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {productTitle}
          </p>
          <div className="flex items-center gap-2">
            <Money
              data={selectedVariant.price!}
              className="text-lg font-bold text-gray-900"
            />
            {isOnSale && (
              <Money
                data={selectedVariant.compareAtPrice!}
                className="text-sm text-gray-500 line-through"
              />
            )}
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          {isOutOfStock ? (
            <button
              disabled
              className="px-6 py-3 bg-gray-300 text-gray-600 rounded-md font-semibold text-sm cursor-not-allowed"
            >
              Sold Out
            </button>
          ) : (
            <AddToCartButton
              lines={[
                {
                  merchandiseId: selectedVariant.id!,
                  quantity: 1,
                },
              ]}
              variant="primary"
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Add to Cart
            </AddToCartButton>
          )}
        </div>
      </div>
    </div>
  );
}
