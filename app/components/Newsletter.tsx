import {Form, useActionData, useNavigation} from '@remix-run/react';
import {useState, useEffect} from 'react';

type NewsletterActionData = {
  success?: boolean;
  error?: string;
  message?: string;
};

export function Newsletter({
  title = 'Get fitness tips & exclusive deals',
  description = 'Join our community and never miss a workout tip or special offer.',
  className = '',
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  const actionData = useActionData<NewsletterActionData>();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const isSubmitting = navigation.state === 'submitting';

  // Reset email field on successful submission
  useEffect(() => {
    if (actionData?.success) {
      setEmail('');
    }
  }, [actionData?.success]);

  return (
    <div className={`rounded-2xl bg-blue-600 px-8 py-12 text-center ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-4 text-lg text-blue-100">{description}</p>

      <Form
        method="post"
        action="/api/newsletter"
        className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </Form>

      {/* Success/Error Messages */}
      {actionData?.success && (
        <div className="mt-4 rounded-md bg-green-50 p-4 max-w-md mx-auto">
          <p className="text-sm font-medium text-green-800">
            {actionData.message || 'Successfully subscribed!'}
          </p>
        </div>
      )}

      {actionData?.error && (
        <div className="mt-4 rounded-md bg-red-50 p-4 max-w-md mx-auto">
          <p className="text-sm font-medium text-red-800">{actionData.error}</p>
        </div>
      )}
    </div>
  );
}
