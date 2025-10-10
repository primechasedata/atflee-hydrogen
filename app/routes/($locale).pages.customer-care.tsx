import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';
import type {MetaArgs} from '@shopify/remix-oxygen';
import {Disclosure} from '@headlessui/react';
import {IconClose} from '~/components/Icon';
import {Heading, Text} from '~/components/Text';
import {InstallationVideoModal} from '~/components/InstallationVideoModal';
import clsx from 'clsx';
import {useState} from 'react';

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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 text-primary py-16 md:py-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <Heading as="h1" className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Customer Care
          </Heading>
          <Text className="text-xl md:text-2xl text-primary/80 mb-4 max-w-3xl mx-auto">
            We're here to help. Support response within 24 hours.
          </Text>
          <Text className="text-lg text-primary/60 max-w-2xl mx-auto">
            Questions about your order, setup, or product? We've got you covered.
          </Text>
        </div>
      </section>

      {/* Quick Help Tools */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Quick Help
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Setup Guide */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-[rgb(var(--color-accent))]/50 transition-all">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Setup Guide
              </h3>
              <p className="text-primary/70 text-sm mb-6 leading-relaxed">
                90-second video showing step-by-step installation.
              </p>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full btn-accent !py-2.5 !px-4 text-sm font-semibold"
              >
                Watch Video
              </button>
            </div>

            {/* Contact Support */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-[rgb(var(--color-accent))]/50 transition-all">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Email Support
              </h3>
              <p className="text-primary/70 text-sm mb-6 leading-relaxed">
                Mon-Fri, 9 AM-5 PM ET. Response within 24 hours.
              </p>
              <a
                href="mailto:support@trahere.com"
                className="block w-full btn-accent !py-2.5 !px-4 text-center text-sm font-semibold"
              >
                Email Us
              </a>
            </div>

            {/* Returns Portal */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-[rgb(var(--color-accent))]/50 transition-all">
              <div className="text-5xl mb-4">↩️</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Returns
              </h3>
              <p className="text-primary/70 text-sm mb-6 leading-relaxed">
                30-day money-back guarantee. No questions asked.
              </p>
              <a
                href="#returns"
                className="block w-full border border-white/20 rounded-lg py-2.5 px-4 text-center text-sm font-semibold text-primary hover:bg-white/5 transition-colors"
              >
                View Policy
              </a>
            </div>

            {/* Warranty Info */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-[rgb(var(--color-accent))]/50 transition-all">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                1-Year Warranty
              </h3>
              <p className="text-primary/70 text-sm mb-6 leading-relaxed">
                Limited warranty for manufacturing defects and normal wear.
              </p>
              <a
                href="#warranty"
                className="block w-full border border-white/20 rounded-lg py-2.5 px-4 text-center text-sm font-semibold text-primary hover:bg-white/5 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-16 md:py-20 bg-black border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10">
            <Heading as="h2" className="text-3xl font-bold text-primary mb-8 text-center">
              Shipping & Delivery
            </Heading>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-primary mb-2">Fast Shipping</h3>
                <p className="text-primary/70 text-sm">Orders ship within 24 hours from our Texas warehouse</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-bold text-primary mb-2">3-5 Days Delivery</h3>
                <p className="text-primary/70 text-sm">Standard shipping to most US addresses</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-primary mb-2">International</h3>
                <p className="text-primary/70 text-sm">We ship worldwide. Times vary by location (7-14 days)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Returns Section */}
      <section id="returns" className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900 border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-4">
              30-Day Money-Back Guarantee
            </Heading>
            <Text className="text-xl text-primary/70">
              Not satisfied? Return it within 30 days for a full refund.
            </Text>
          </div>

          <div className="glass-strong rounded-2xl p-8 border border-white/10">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">How Returns Work</h3>
                <ol className="space-y-3 text-primary/80">
                  <li className="flex gap-3">
                    <span className="text-[rgb(var(--color-accent))] font-bold">1.</span>
                    <span>Email <a href="mailto:support@trahere.com" className="text-[rgb(var(--color-accent))] hover:underline">support@trahere.com</a> with your order number</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[rgb(var(--color-accent))] font-bold">2.</span>
                    <span>We'll send you a prepaid return shipping label</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[rgb(var(--color-accent))] font-bold">3.</span>
                    <span>Pack the item securely and drop it off at any carrier location</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[rgb(var(--color-accent))] font-bold">4.</span>
                    <span>Receive your refund within 2-3 business days of us receiving the return</span>
                  </li>
                </ol>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="font-bold text-primary mb-2">Return Requirements</h4>
                <ul className="space-y-2 text-sm text-primary/70">
                  <li>• Product must be in original condition</li>
                  <li>• Include all original packaging and accessories</li>
                  <li>• Return within 30 days of delivery</li>
                  <li>• We cover return shipping costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section id="warranty" className="py-16 md:py-20 bg-black border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-4">
              1-Year Limited Warranty
            </Heading>
            <Text className="text-xl text-primary/70">
              We stand behind our products with comprehensive coverage.
            </Text>
          </div>

          <div className="glass-strong rounded-2xl p-8 border border-white/10">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">What's Covered</h3>
                <ul className="space-y-2 text-primary/80">
                  <li>• Manufacturing defects</li>
                  <li>• Material failures under normal use</li>
                  <li>• Foam degradation or compression</li>
                  <li>• Metal fatigue or structural issues</li>
                  <li>• Adjustment mechanism failures</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold text-primary mb-3">How to File a Claim</h3>
                <ol className="space-y-3 text-primary/80">
                  <li className="flex gap-3">
                    <span className="text-[rgb(var(--color-accent))] font-bold">1.</span>
                    <span>Email <a href="mailto:support@trahere.com" className="text-[rgb(var(--color-accent))] hover:underline">support@trahere.com</a> with photos of the issue</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[rgb(var(--color-accent))] font-bold">2.</span>
                    <span>Include your order number and description of the problem</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[rgb(var(--color-accent))] font-bold">3.</span>
                    <span>We'll review and send a replacement if covered under warranty</span>
                  </li>
                </ol>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="font-bold text-primary mb-2">Not Covered</h4>
                <ul className="space-y-2 text-sm text-primary/70">
                  <li>• Damage from misuse or improper installation</li>
                  <li>• Normal wear and tear beyond 1 year</li>
                  <li>• Cosmetic issues that don't affect function</li>
                  <li>• Damage from excessive weight (over 260 lbs)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Still Have Questions?
          </Heading>
          <Text className="text-lg text-primary/70 mb-8">
            Our support team typically responds within 24 hours during business hours.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@trahere.com"
              className="btn-accent !py-3 !px-8 text-base font-semibold"
            >
              Email Support
            </a>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="border border-white/20 rounded-lg py-3 px-8 text-base font-semibold text-primary hover:bg-white/5 transition-colors"
            >
              Watch Setup Video
            </button>
          </div>
        </div>
      </section>

      {/* Installation Video Modal */}
      <InstallationVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}

function FAQSection() {
  const faqCategories = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Orders ship within 24 hours from our Texas warehouse. Standard shipping takes 3-5 business days within the US. Expedited shipping (2-3 days) and overnight options are available at checkout.'
        },
        {
          q: 'What carriers do you use?',
          a: 'We primarily use USPS, UPS, and FedEx depending on your location and shipping speed selected. You\'ll receive tracking information once your order ships.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we ship to most countries worldwide. International shipping times vary by destination (typically 7-14 business days). Customs duties and taxes may apply based on your country\'s regulations.'
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! You\'ll receive a shipping confirmation email with tracking information once your order ships. You can also check your order status in your account dashboard.'
        }
      ]
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, return it within 30 days of delivery for a full refund. No questions asked.'
        },
        {
          q: 'How do I return my product?',
          a: 'Email support@trahere.com with your order number. We\'ll send you a prepaid return shipping label. Pack the item securely in its original packaging and drop it off at any carrier location.'
        },
        {
          q: 'Who pays for return shipping?',
          a: 'We provide prepaid return shipping labels for all returns within the 30-day window. You don\'t pay anything for return shipping.'
        },
        {
          q: 'How long until I get my refund?',
          a: 'Refunds are processed within 2-3 business days of receiving your return. It may take an additional 5-7 business days for the funds to appear in your account, depending on your bank.'
        },
        {
          q: 'Can I exchange for a different product?',
          a: 'Currently, we process returns for refunds. If you\'d like a different product, you can place a new order and return the original item for a refund.'
        }
      ]
    },
    {
      category: 'Warranty',
      questions: [
        {
          q: 'What does the warranty cover?',
          a: 'Our 1-year limited warranty covers manufacturing defects and normal wear under proper use. This includes foam degradation, metal fatigue, structural issues, and adjustment mechanism failures.'
        },
        {
          q: 'How do I file a warranty claim?',
          a: 'Email support@trahere.com with photos of the issue and your order number. Our team will review your claim and send a replacement if covered under warranty, typically within 3-5 business days.'
        },
        {
          q: 'What is not covered by warranty?',
          a: 'The warranty doesn\'t cover damage from misuse, improper installation, excessive weight (over 260 lbs), cosmetic issues that don\'t affect functionality, or normal wear and tear beyond 1 year.'
        }
      ]
    },
    {
      category: 'Installation & Setup',
      questions: [
        {
          q: 'What doorway sizes does it fit?',
          a: 'The TB7 fits standard doorways 31.9-36.6 inches wide and up to 6 inches deep. It works on wood, metal, and composite door frames. Measure your doorway width before ordering.'
        },
        {
          q: 'How much clearance do I need above the bar?',
          a: 'You need at least 6-8 inches of clearance above the bar for proper installation and comfortable use. Make sure you can fully extend your arms overhead.'
        },
        {
          q: 'Is installation really tool-free?',
          a: 'Yes! Installation takes about 10-15 seconds with no tools required. Simply extend the bar to your doorway width, position it in the frame, and tighten by hand.'
        },
        {
          q: 'Can I adjust the width after installation?',
          a: 'Absolutely. You can easily adjust the width by loosening the adjustment mechanism, resizing to fit, and tightening again. Takes just a few seconds.'
        },
        {
          q: 'Will it damage my door frame?',
          a: 'No. The TB7 uses a friction-grip system with premium foam padding that protects your door frame. Unlike screw-in bars, it leaves zero marks or damage.'
        }
      ]
    },
    {
      category: 'Safety & Usage',
      questions: [
        {
          q: 'What is the weight limit?',
          a: 'The recommended user weight is 260 lbs. The bar has been tested to 573 lbs under laboratory conditions. If you\'re over 260 lbs, contact us to discuss suitability.'
        },
        {
          q: 'Can children use it safely?',
          a: 'Yes, with adult supervision. Ensure proper installation and that children can safely reach and dismount from the bar. We recommend adult supervision for users under 12.'
        },
        {
          q: 'How often should I check the installation?',
          a: 'Inspect the bar before each use and retighten if needed. We recommend a thorough check weekly if used daily, or monthly for occasional use.'
        },
        {
          q: 'Can I do kipping or swinging pull-ups?',
          a: 'The TB7 is designed for controlled pull-ups and chin-ups. Excessive swinging, kipping, or dynamic movements may compromise stability and are not recommended.'
        },
        {
          q: 'Can I hang additional weight (weighted vest)?',
          a: 'Yes, as long as your total weight (body + vest) stays under 260 lbs. Make sure the bar is properly installed and check tightness before each weighted session.'
        }
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-900 border-t border-white/10">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Frequently Asked Questions
        </Heading>

        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.category}>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.questions.map((faq, idx) => (
                  <Disclosure key={idx} as="div">
                    {({open}) => (
                      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors">
                        <Disclosure.Button className="w-full text-left px-6 py-5 flex justify-between items-start gap-4">
                          <span className="font-semibold text-lg text-primary flex-1 min-w-0">
                            {faq.q}
                          </span>
                          <IconClose
                            className={clsx(
                              'flex-shrink-0 transition-transform duration-200 text-primary mt-0.5',
                              !open && 'rotate-[45deg]',
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-6 pb-5 pt-2">
                          <p className="text-primary/80 leading-relaxed">{faq.a}</p>
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
