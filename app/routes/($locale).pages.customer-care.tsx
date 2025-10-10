import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Form, useActionData, useNavigation} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';
import type {MetaArgs} from '@shopify/remix-oxygen';
import {Disclosure} from '@headlessui/react';
import {IconClose} from '~/components/Icon';
import clsx from 'clsx';
import {useState, useEffect} from 'react';

export async function loader({context}: LoaderFunctionArgs) {
  return json({
    seo: {
      title: 'Customer Care | Trahere',
      description:
        'Get help with your order. Track packages, view setup guides, manage returns and find answers to common questions.',
    },
  });
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data!.seo);
};

export default function CustomerCare() {
  return (
    <div className="customer-care">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Customer Care
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            We're here to help. Get support in under 24 hours.
          </p>
        </div>
      </section>

      {/* Quick Help Tools */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quick Help Tools
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Order Tracking */}
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Order Tracking
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Enter your order number to see real-time tracking.
              </p>
              <OrderTrackingForm />
            </div>

            {/* Setup Guide */}
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Setup Guide
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                90-second video showing step-by-step installation.
              </p>
              <a
                href="#setup-video"
                className="inline-block w-full btn-accent !py-2 !px-4 text-center text-sm font-semibold"
              >
                Watch Video
              </a>
              <a
                href="/setup-guide.pdf"
                className="inline-block w-full mt-2 rounded-md bg-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-900 hover:bg-gray-300 transition-colors"
              >
                Download PDF
              </a>
            </div>

            {/* Returns/Exchanges */}
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Returns & Exchanges
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Start a return or exchange within 30 days.
              </p>
              <a
                href="#returns"
                className="inline-block w-full btn-accent !py-2 !px-4 text-center text-sm font-semibold"
              >
                Start Return
              </a>
            </div>

            {/* Contact Support */}
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Contact Support
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Mon-Fri, 9 AM-5 PM ET. Response in &lt; 24 hours.
              </p>
              <a
                href="mailto:support@trahere.com"
                className="inline-block w-full btn-accent !py-2 !px-4 text-center text-sm font-semibold"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Send Us a Message
            </h2>
            <p className="mt-4 text-gray-600">
              Average reply time: less than 24 hours
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

function OrderTrackingForm() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form className="space-y-3">
      <input
        type="text"
        placeholder="Order number"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[rgb(var(--color-accent))]"
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[rgb(var(--color-accent))]"
      />
      <button
        type="submit"
        className="w-full btn-accent !py-2 !px-4 text-sm font-semibold"
      >
        Track Order
      </button>
    </form>
  );
}

function FAQSection() {
  const faqCategories = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Orders ship within 24 hours. Standard shipping takes 3-5 business days. Expedited shipping (2-3 days) and overnight options are available at checkout.'
        },
        {
          q: 'What carriers do you use?',
          a: 'We primarily use USPS, UPS, and FedEx depending on your location and shipping speed selected.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we ship to most countries. International shipping times vary by destination (typically 7-14 business days).'
        }
      ]
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return window?',
          a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, return it within 30 days of delivery for a full refund.'
        },
        {
          q: 'How do I return my product?',
          a: 'Use our returns portal above to generate a prepaid shipping label. Pack the item securely and drop it off at any carrier location.'
        },
        {
          q: 'Who pays for return shipping?',
          a: 'We provide prepaid return labels for all returns within the 30-day window.'
        },
        {
          q: 'How long until I get my refund?',
          a: 'Refunds are processed within 2-3 business days of receiving your return. It may take an additional 5-7 business days for the funds to appear in your account.'
        }
      ]
    },
    {
      category: 'Warranty',
      questions: [
        {
          q: 'What does the warranty cover?',
          a: 'Our 2-year warranty covers manufacturing defects and normal wear under proper use. This includes foam degradation, metal fatigue, or adjustment mechanism failures.'
        },
        {
          q: 'How do I file a warranty claim?',
          a: 'Email us photos of the issue along with your order number. We\'ll review and send a replacement if covered under warranty.'
        }
      ]
    },
    {
      category: 'Installation',
      questions: [
        {
          q: 'What doorway sizes does it fit?',
          a: 'The TB7 fits doorways 31.9-36.6 inches wide. Measure your door frame width before ordering.'
        },
        {
          q: 'How much clearance do I need?',
          a: 'You need at least 6-8 inches of clearance above the bar for proper installation and use.'
        },
        {
          q: 'Is it really tool-free?',
          a: 'Yes! Installation takes about 10 seconds with no tools required. Just extend the bar to your doorway width and tighten.'
        },
        {
          q: 'Can I adjust the width after installation?',
          a: 'Yes, you can easily adjust the width by loosening the adjustment mechanism, resizing, and tightening again.'
        }
      ]
    },
    {
      category: 'Safety',
      questions: [
        {
          q: 'What is the weight limit?',
          a: 'Recommended weight limit is 260 lbs. The bar has been tested to 573 lbs under laboratory conditions.'
        },
        {
          q: 'Can children use it?',
          a: 'Yes, with adult supervision. Ensure proper installation and that children can safely reach and dismount.'
        },
        {
          q: 'How often should I check the installation?',
          a: 'Inspect the bar before each use and retighten if needed. We recommend a full check weekly if used daily.'
        },
        {
          q: 'Can I do swinging or kipping pull-ups?',
          a: 'The TB7 is designed for controlled pull-ups. Excessive swinging or kipping may compromise stability.'
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.category}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.questions.map((faq, idx) => (
                  <Disclosure key={idx} as="div">
                    {({open}) => (
                      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                        <Disclosure.Button className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                          <span className="font-semibold text-gray-900">{faq.q}</span>
                          <IconClose
                            className={clsx(
                              'flex-shrink-0 transition-transform duration-200',
                              !open && 'rotate-[45deg]',
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-6 pb-4 pt-2">
                          <p className="text-gray-700">{faq.a}</p>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const actionData = useActionData<{success?: boolean; error?: string; message?: string}>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" action="/api/contact" className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-900 mb-1">
            Order Number (optional)
          </label>
          <input
            type="text"
            id="order"
            name="order"
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-[rgb(var(--color-accent))] disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-accent !py-3 !px-6 text-base font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        <p className="text-sm text-gray-500 text-center">
          This form is protected by hCaptcha. We typically respond within 24 hours.
        </p>
      </Form>

      {/* Success/Error Messages */}
      {actionData?.success && (
        <div className="mt-4 rounded-md bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">
            {actionData.message || 'Message sent successfully!'}
          </p>
        </div>
      )}

      {actionData?.error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{actionData.error}</p>
        </div>
      )}
    </>
  );
}
