import {useState} from 'react';

interface VideoSectionProps {
  videoUrl?: string;
  youtubeId?: string;
  title?: string;
  subtitle?: string;
  thumbnail?: string;
  variant?: 'default' | 'hero' | 'inline';
}

export function VideoSection({
  videoUrl,
  youtubeId = 'dQw4w9WgXcQ', // Replace with actual video ID
  title = 'See the TB7 in action',
  subtitle = 'Watch our 30-second installation demo',
  thumbnail,
  variant = 'default',
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`
    : videoUrl;

  const thumbnailUrl =
    thumbnail || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  if (variant === 'hero') {
    return <VideoHero {...{isPlaying, setIsPlaying, embedUrl, thumbnailUrl}} />;
  }

  if (variant === 'inline') {
    return (
      <VideoInline {...{isPlaying, setIsPlaying, embedUrl, thumbnailUrl}} />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24" id="demo">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-neutral-600">{subtitle}</p>
        )}
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full group"
            aria-label="Play video"
          >
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-neutral-900 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-lg font-semibold">Watch Installation Demo</p>
              <p className="text-sm text-white/80 mt-1">30 seconds</p>
            </div>
          </button>
        ) : (
          <iframe
            src={embedUrl}
            title="Product demo video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold text-neutral-900">5 sec</div>
          <div className="text-sm text-neutral-600 mt-1">Install time</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-neutral-900">300 lbs</div>
          <div className="text-sm text-neutral-600 mt-1">Weight capacity</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-neutral-900">0</div>
          <div className="text-sm text-neutral-600 mt-1">Door damage</div>
        </div>
      </div>
    </section>
  );
}

function VideoHero({
  isPlaying,
  setIsPlaying,
  embedUrl,
  thumbnailUrl,
}: {
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  embedUrl?: string;
  thumbnailUrl: string;
}) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold">
            Installation takes 5 seconds. Seriously.
          </h2>
          <p className="mt-4 text-xl text-neutral-300">
            No tools. No screws. No damage.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full group"
            >
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-neutral-900 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src={embedUrl}
              title="Product demo video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}

function VideoInline({
  isPlaying,
  setIsPlaying,
  embedUrl,
  thumbnailUrl,
}: {
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  embedUrl?: string;
  thumbnailUrl: string;
}) {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
      {!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          className="relative w-full h-full group"
        >
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-all flex items-center justify-center">
              <svg
                className="w-6 h-6 text-neutral-900 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title="Product demo video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
