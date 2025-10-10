import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import type {MediaFragment} from 'storefrontapi.generated';

/**
 * A minimal, clean product gallery with single image display and left/right navigation
 */
export function ProductGallery({
  media,
  className,
}: {
  media: MediaFragment[];
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media.length) {
    return null;
  }

  // Filter to only images
  const images = media.filter((med) => med.__typename === 'MediaImage');

  if (!images.length) {
    return null;
  }

  const currentMedia = images[currentIndex];
  const image =
    currentMedia.__typename === 'MediaImage'
      ? {...currentMedia.image, altText: currentMedia.alt || 'Product image'}
      : null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const hasMultipleImages = images.length > 1;

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Container */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
        {image && (
          <Image
            loading="eager"
            data={image}
            className="object-contain w-full h-full"
            sizes="(min-width: 48em) 50vw, 100vw"
          />
        )}

        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm z-10"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm z-10"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - Optional, only show if 2-4 images */}
      {hasMultipleImages && images.length <= 4 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((med, idx) => {
            const thumbImage =
              med.__typename === 'MediaImage'
                ? {...med.image, altText: med.alt || 'Product thumbnail'}
                : null;

            return (
              <button
                key={med.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-[rgb(var(--color-accent))] ring-2 ring-[rgb(var(--color-accent))]/30'
                    : 'border-transparent hover:border-gray-300'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                {thumbImage && (
                  <Image
                    data={thumbImage}
                    className="object-cover w-full h-full"
                    sizes="64px"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
