import {useState, useRef, useEffect} from 'react';
import {Heading, Text} from '~/components/Text';

interface UGCVideo {
  id: string;
  videoUrl: string;
  posterUrl: string;
  caption: string;
  doorwayWidth?: number;
  location?: string;
}

interface UGCSectionProps {
  videos?: UGCVideo[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact';
}

const DEFAULT_VIDEOS: UGCVideo[] = [
  {
    id: 'youtube-demo',
    videoUrl: 'https://www.youtube.com/embed/RGsUplxPrT0',
    posterUrl: 'https://img.youtube.com/vi/RGsUplxPrT0/maxresdefault.jpg',
    caption: 'Installation & Demo',
    doorwayWidth: 32,
    location: 'Product Demo',
  },
  {
    id: 'narrow-apartment',
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/e2b39c77326a4873a2bd50b3329742d9.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0632/1383/0231/files/ugc-thumb-1.jpg',
    caption: '28 in doorway, no screws',
    doorwayWidth: 28,
    location: 'Austin, TX apartment',
  },
  {
    id: 'install-demo',
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/8342a7b8fb804f9b9154fa8907b119fd.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0632/1383/0231/files/ugc-thumb-2.jpg',
    caption: 'Install in under a minute',
    doorwayWidth: 30,
    location: 'Portland, OR',
  },
  {
    id: 'protective-pads',
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/696b943ff3314f459b56e3c756e82236.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0632/1383/0231/files/ugc-thumb-3.jpg',
    caption: 'Protective pads, no marks',
    doorwayWidth: 32,
    location: 'Chicago, IL',
  },
  {
    id: 'wide-doorway',
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/5275c67ffbe34cc3a9dc96b558d5bda2.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0632/1383/0231/files/ugc-thumb-4.jpg',
    caption: '32 in doorway, stable fit',
    doorwayWidth: 32,
    location: 'Denver, CO',
  },
  {
    id: 'customer-demo',
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/023f9cf4f08c4183ae5e241833422672.mp4',
    posterUrl: 'https://cdn.shopify.com/s/files/1/0632/1383/0231/files/ugc-thumb-5.jpg',
    caption: 'Real home demonstration',
    doorwayWidth: 30,
    location: 'Customer home',
  },
];

export function UGCSection({
  videos = DEFAULT_VIDEOS,
  title = 'Real homes. Real doorways.',
  subtitle = 'Short customer clips. Sound off by default. Tap to watch.',
  variant = 'default',
}: UGCSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const {scrollLeft, scrollWidth, clientWidth} = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {title}
            </Heading>
            <Text className="text-lg text-primary/70">
              {subtitle}
            </Text>
          </div>
        </div>

        {/* Video Reel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-lg"
              aria-label="Previous videos"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-lg"
              aria-label="Next videos"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Scrollable Video Reel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-4"
            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
          >
            {videos.map((video) => (
              <UGCVideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com/trahere_us"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-primary border border-white/20 rounded-full transition-all font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Submit your clip on Instagram
          </a>
          <p className="text-sm text-primary/50 mt-3">
            Customer videos. Used with permission.
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function UGCVideoCard({video}: {video: UGCVideo}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isYouTube = video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be');

  const handleVideoClick = () => {
    if (isYouTube) {
      setIsPlaying(true);
      setShowPlayButton(false);
      return;
    }

    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPlayButton(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
  };

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] snap-start">
      <div
        className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-black/20 group"
      >
        {isYouTube && isPlaying ? (
          <iframe
            src={`${video.videoUrl}?autoplay=1&mute=1&controls=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.caption}
          />
        ) : isYouTube ? (
          <button
            onClick={handleVideoClick}
            className="relative w-full h-full"
            aria-label={`Play video: ${video.caption}`}
          >
            <img
              src={video.posterUrl}
              alt={video.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/40">
              <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-all flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-black ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm font-medium">{video.caption}</p>
              {video.location && (
                <p className="text-white/70 text-xs mt-1">{video.location}</p>
              )}
            </div>
          </button>
        ) : (
          <button
            onClick={handleVideoClick}
            className="relative w-full h-full"
            aria-label={`Customer video: ${video.caption}`}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
              onLoadedData={(e) => {
                // Ensure first frame is displayed as poster
                if (!isPlaying) {
                  e.currentTarget.currentTime = 0;
                }
              }}
            >
              <source src={video.videoUrl} type="video/mp4" />
            </video>

            {/* Play Button Overlay */}
            {showPlayButton && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/40">
                <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-all flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-black ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm font-medium">{video.caption}</p>
              {video.location && (
                <p className="text-white/70 text-xs mt-1">{video.location}</p>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
