import {Disclosure} from '@headlessui/react';
import {IconClose} from '~/components/Icon';
import clsx from 'clsx';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact';
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'Will this damage my door frame?',
    answer:
      'No. The TB7 uses a patented friction-grip system with foam padding that protects your door frame. Unlike screw-in bars, it leaves zero marks or damage. Thousands of customers in apartments have used it with no issues.',
    category: 'Installation',
  },
  {
    id: '2',
    question: 'What door frames does it fit?',
    answer:
      'The TB7 fits standard door frames 31.9-36.6 inches wide and up to 6 inches deep. It works on wood, metal, and composite frames. If you have an unusual doorway, contact us and we\'ll help you measure.',
    category: 'Installation',
  },
  {
    id: '3',
    question: 'How much weight can it hold?',
    answer:
      'The TB7 has a recommended user weight of 260 lbs and has been tested to 573 lbs under laboratory conditions. We\'ve had powerlifters and weighted vest users with zero failures. If you\'re over 260 lbs, reach out and we\'ll discuss options.',
    category: 'Safety',
  },
  {
    id: '4',
    question: 'Why is the grip so wide?',
    answer:
      'Standard pull-up bars force your shoulders into internal rotation, which causes impingement and pain. Our 7-inch wider grip keeps your shoulders in a natural, external rotation. This prevents injury and lets you do more reps pain-free.',
    category: 'Design',
  },
  {
    id: '5',
    question: 'Can beginners use this?',
    answer:
      'Absolutely. Start with assisted pull-ups (resistance bands), negatives, or just dead hangs to build strength. The wider grip actually makes it easier on your shoulders. We include a beginner progression guide with every order.',
    category: 'Training',
  },
  {
    id: '6',
    question: 'How long does shipping take?',
    answer:
      'We ship from our Texas warehouse within 24 hours. Most US orders arrive in 2-4 business days. International shipping available - times vary by country.',
    category: 'Shipping',
  },
  {
    id: '7',
    question: 'What\'s your return policy?',
    answer:
      '30-day money-back guarantee, no questions asked. If you don\'t love it, send it back for a full refund. We pay return shipping. Less than 2% of customers return it.',
    category: 'Returns',
  },
  {
    id: '8',
    question: 'How is this different from a $30 Amazon bar?',
    answer:
      'Cheap bars use narrow grips that hurt your shoulders, thin foam that tears, and weak mounting that fails. The TB7 is engineered for daily use: medical-grade foam, high-grade steel, and a patented grip system. Plus our 2-year warranty vs their 90 days.',
    category: 'Product',
  },
  {
    id: '9',
    question: 'Can I do more than pull-ups?',
    answer:
      'Yes. Use it for chin-ups, neutral grip, hanging leg raises, resistance band work, and even as an anchor for TRX straps. It\'s the most versatile home gym tool you\'ll own.',
    category: 'Training',
  },
  {
    id: '10',
    question: 'Do you offer a warranty?',
    answer:
      '2-year manufacturer warranty on all parts. If anything breaks from normal use, we\'ll replace it free. We also offer lifetime customer support - just email us anytime.',
    category: 'Warranty',
  },
];

export function FAQ({
  faqs = DEFAULT_FAQS,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about the TB7 Pull-Up Bar',
  variant = 'default',
}: FAQProps) {
  if (variant === 'compact') {
    return <FAQCompact faqs={faqs.slice(0, 5)} />;
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-primary/70">{subtitle}</p>
          )}
        </div>

        <div className="space-y-4">
        {faqs.map((faq) => (
          <Disclosure key={faq.id} as="div">
            {({open}) => (
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-colors">
                <Disclosure.Button className="w-full text-left px-6 py-5 flex justify-between items-start gap-4 transition-colors">
                  <span className="font-semibold text-lg text-primary flex-1 min-w-0">
                    {faq.question}
                  </span>
                  <IconClose
                    className={clsx(
                      'flex-shrink-0 transition-transform duration-200 text-primary mt-0.5',
                      !open && 'rotate-[45deg]',
                    )}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pb-5 pt-2">
                  <p className="text-primary/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
        </div>

        <div className="mt-12 text-center glass-strong rounded-2xl p-8 border border-white/10">
          <h3 className="text-xl font-bold mb-2 text-primary">Still have questions?</h3>
          <p className="text-primary/70 mb-4">
            Our team responds within 2 hours during business hours.
          </p>
          <a
            href="mailto:support@trahere.com"
            className="inline-flex items-center px-6 py-3 btn-accent rounded-full transition-colors"
          >
            Email us
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQCompact({faqs}: {faqs: FAQItem[]}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold mb-4">Common Questions</h3>
      {faqs.map((faq) => (
        <Disclosure key={faq.id} as="div">
          {({open}) => (
            <div className="border-b border-neutral-200">
              <Disclosure.Button className="w-full text-left py-3 flex justify-between items-start gap-4">
                <span className="font-medium flex-1 min-w-0">{faq.question}</span>
                <IconClose
                  className={clsx(
                    'flex-shrink-0 transition-transform duration-200 w-5 h-5 mt-0.5',
                    !open && 'rotate-[45deg]',
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pb-3">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
