import {IconCheck} from '~/components/Icon';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location?: string;
  image?: string;
  content: string;
  rating: number;
  verified?: boolean;
  result?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact' | 'hero';
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Chen',
    role: 'Software Engineer',
    location: 'San Francisco, CA',
    content:
      "I've tried 3 other pull-up bars and they all pinched my shoulders. The TB7's wide grip is a game-changer. I went from 2 pull-ups to 12 in 6 weeks.",
    rating: 5,
    verified: true,
    result: '2 → 12 pull-ups in 6 weeks',
  },
  {
    id: '2',
    name: 'Sarah Thompson',
    role: 'Physical Therapist',
    location: 'Austin, TX',
    content:
      'As a PT, I recommend this to all my patients. The shoulder-safe design prevents the internal rotation that causes impingement. Install takes 10 seconds.',
    rating: 5,
    verified: true,
  },
  {
    id: '3',
    name: 'David Rodriguez',
    role: 'Former Marine',
    location: 'Denver, CO',
    content:
      "Holds 300lbs no problem. I do weighted pull-ups and it doesn't budge. The foam grips are bomb-proof. Worth every penny.",
    rating: 5,
    verified: true,
    result: 'Supports 300+ lbs',
  },
  {
    id: '4',
    name: 'Emily Watson',
    role: 'Mom of 3',
    location: 'Portland, OR',
    content:
      'I workout when kids nap. Takes 5 seconds to set up, no damage to doorframe. Down 15lbs in 3 months. My arms have never looked better.',
    rating: 5,
    verified: true,
    result: 'Lost 15 lbs in 3 months',
  },
  {
    id: '5',
    name: 'James Park',
    role: 'CrossFit Athlete',
    location: 'Seattle, WA',
    content:
      'Travel for work constantly. This bar goes everywhere. Hotel door frames, gym bathroom - wherever. Consistency is key and this makes it easy.',
    rating: 5,
    verified: true,
  },
  {
    id: '6',
    name: 'Lisa Martinez',
    role: 'Yoga Instructor',
    location: 'Miami, FL',
    content:
      'The grip width prevents shoulder pain I got from other bars. I can finally do pull-ups without fear. My upper body strength has doubled.',
    rating: 5,
    verified: true,
  },
];

export function Testimonials({
  testimonials = DEFAULT_TESTIMONIALS,
  title = 'Loved by 10,000+ home athletes',
  subtitle = 'Join thousands who transformed their fitness at home',
  variant = 'default',
}: TestimonialsProps) {
  if (variant === 'hero') {
    return <TestimonialsHero testimonials={testimonials} title={title} />;
  }

  if (variant === 'compact') {
    return <TestimonialsCompact testimonials={testimonials} />;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-neutral-600">{subtitle}</p>
        )}
        <div className="mt-6 flex items-center justify-center gap-2 text-lg">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            ))}
          </div>
          <span className="font-semibold">4.9</span>
          <span className="text-neutral-600">
            · {testimonials.length.toLocaleString()}+ reviews
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-neutral-500">
          All reviews are from verified purchasers
        </p>
      </div>
    </section>
  );
}

function TestimonialCard({testimonial}: {testimonial: Testimonial}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              ★
            </span>
          ))}
        </div>
        {testimonial.verified && (
          <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
            <IconCheck className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      <blockquote className="text-neutral-700 mb-4 leading-relaxed">
        "{testimonial.content}"
      </blockquote>

      {testimonial.result && (
        <div className="mb-4 bg-neutral-50 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-900">
          {testimonial.result}
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={`${testimonial.name} profile photo`}
            title={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-semibold">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-neutral-900">
            {testimonial.name}
          </div>
          <div className="text-sm text-neutral-600">
            {testimonial.role}
            {testimonial.location && ` · ${testimonial.location}`}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsHero({
  testimonials,
  title,
}: {
  testimonials: Testimonial[];
  title: string;
}) {
  return (
    <section className="bg-neutral-900 text-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="text-center">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-neutral-200 mb-4 italic">
                "{testimonial.content}"
              </p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-neutral-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsCompact({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="py-8 space-y-4">
      {testimonials.slice(0, 3).map((testimonial) => (
        <div
          key={testimonial.id}
          className="border-l-4 border-neutral-900 pl-4 py-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold">{testimonial.name}</span>
          </div>
          <p className="text-sm text-neutral-700 italic">
            "{testimonial.content.substring(0, 120)}..."
          </p>
        </div>
      ))}
    </div>
  );
}
