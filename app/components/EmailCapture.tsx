import {useState} from 'react';
import {Button} from '~/components/Button';

interface EmailCaptureProps {
  variant?: 'default' | 'inline' | 'popup' | 'footer';
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  incentive?: string;
}

export function EmailCapture({
  variant = 'default',
  title = 'Get 10% off your first order',
  subtitle = 'Plus weekly pull-up tips and exclusive deals',
  placeholder = 'Enter your email',
  buttonText = 'Get Discount',
  incentive = '10% OFF',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Replace with actual newsletter API endpoint
      // For now, we'll simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus('success');
      setMessage('Check your email for your discount code!');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (variant === 'inline') {
    return <EmailCaptureInline {...{email, setEmail, handleSubmit, status, message, placeholder, buttonText}} />;
  }

  if (variant === 'popup') {
    return <EmailCapturePopup {...{email, setEmail, handleSubmit, status, message, title, subtitle, placeholder, buttonText, incentive}} />;
  }

  if (variant === 'footer') {
    return <EmailCaptureFooter {...{email, setEmail, handleSubmit, status, message, placeholder}} />;
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {incentive && (
            <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-4">
              {incentive}
            </div>
          )}
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-300 mb-8">
            {subtitle}
          </p>

          {status === 'success' ? (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-green-100">
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="flex-1 px-6 py-4 rounded-full text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={status === 'loading'}
              />
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-white text-neutral-900 rounded-full font-semibold hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                {status === 'loading' ? 'Submitting...' : buttonText}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-4 text-red-300 text-sm">{message}</p>
          )}

          <p className="mt-4 text-xs text-neutral-400">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

function EmailCaptureInline({
  email,
  setEmail,
  handleSubmit,
  status,
  message,
  placeholder,
  buttonText,
}: {
  email: string;
  setEmail: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  status: string;
  message: string;
  placeholder: string;
  buttonText: string;
}) {
  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
            disabled={status === 'loading'}
          />
          <Button
            type="submit"
            disabled={status === 'loading'}
            variant="primary"
            className="px-4 py-2 text-sm"
          >
            {status === 'loading' ? 'Sending...' : buttonText}
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600 text-xs">{message}</p>
      )}
    </div>
  );
}

function EmailCapturePopup({
  email,
  setEmail,
  handleSubmit,
  status,
  message,
  title,
  subtitle,
  placeholder,
  buttonText,
  incentive,
}: {
  email: string;
  setEmail: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  status: string;
  message: string;
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  incentive: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md">
      <div className="text-center">
        {incentive && (
          <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-4">
            {incentive}
          </div>
        )}
        <h3 className="text-2xl font-extrabold mb-2">{title}</h3>
        <p className="text-neutral-600 mb-6">{subtitle}</p>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              disabled={status === 'loading'}
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              variant="primary"
              className="w-full py-3"
            >
              {status === 'loading' ? 'Submitting...' : buttonText}
            </Button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-red-600 text-sm">{message}</p>
        )}

        <p className="mt-4 text-xs text-neutral-500">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

function EmailCaptureFooter({
  email,
  setEmail,
  handleSubmit,
  status,
  message,
  placeholder,
}: {
  email: string;
  setEmail: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  status: string;
  message: string;
  placeholder: string;
}) {
  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-bold mb-3">Stay in the Loop</h3>
      <p className="text-sm text-neutral-400 mb-4">
        Get training tips and exclusive offers
      </p>
      {status === 'success' ? (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-green-100 text-sm">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            disabled={status === 'loading'}
          />
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 text-sm"
          >
            {status === 'loading' ? '...' : 'Join'}
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-400 text-xs">{message}</p>
      )}
    </div>
  );
}
