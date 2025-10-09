import {useFetcher} from '@remix-run/react';
import {useEffect, useRef, useState} from 'react';

type NewsletterResponse = { success?: boolean; error?: string; message?: string } | undefined;

export function Newsletter({
  title = 'Get fitness tips & exclusive deals',
  description = 'Join our community and never miss a workout tip or special offer.',
  className = '',
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  const fetcher = useFetcher<NewsletterResponse>();
  const [email, setEmail] = useState('');
  const liveRef = useRef<HTMLDivElement | null>(null);

  const isSubmitting = fetcher.state === 'submitting';

  // Reset email field on successful submission
  useEffect(() => {
    if (fetcher.data?.success) setEmail('');
    if (liveRef.current && (fetcher.data?.success || fetcher.data?.error)) {
      liveRef.current.focus();
    }
  }, [fetcher.data]);

  return (
    <div className={`stroke-gradient glass-strong px-8 py-12 text-center ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-primary">{title}</h2>
      <p className="mt-4 text-lg text-primary/70">{description}</p>

      <fetcher.Form
        method="post"
        action="/api/newsletter" aria-labelledby="newsletter-heading"
        className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-md bg-white/5 border border-white/10 px-4 py-3 text-primary placeholder:text-primary/50 focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-transparent"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="btn-accent px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </fetcher.Form>

      {/* Success/Error Messages */}
      <div ref={liveRef} tabIndex={-1} aria-live="polite" className="mt-4 max-w-md mx-auto">
        {fetcher.data?.success && (
          <div className="rounded-md bg-green-500/10 ring-1 ring-green-400/20 p-4">
            <p className="text-sm text-green-200">{fetcher.data.message || 'Thank you for subscribing! Check your inbox.'}</p>
          </div>
        )}
        {fetcher.data?.error && (
          <div className="rounded-md bg-red-500/10 ring-1 ring-red-400/20 p-4">
            <p className="text-sm text-red-200">{fetcher.data.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
