import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';
import type {MetaArgs} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {Newsletter} from '~/components/Newsletter';

export async function loader({context}: LoaderFunctionArgs) {
  return json({
    seo: {
      title: 'Education Hub | Trahere',
      description:
        'Your learning center for pull-up training, fitness tests, workouts, habit building and product reviews. Clear guides focused on real progress.',
    },
  });
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data!.seo);
};

export default function EducationHub() {
  const categories = [
    {
      id: 'news',
      title: 'News',
      description: 'Latest updates, product releases, and fitness industry insights.',
      icon: '📰',
      link: '/pages/education/news'
    },
    {
      id: 'fitness-tests',
      title: 'Fitness Tests',
      description: 'Benchmark your progress with standardized pull-up and strength assessments.',
      icon: '📊',
      link: '/pages/education/fitness-tests'
    },
    {
      id: 'workouts',
      title: 'Workouts',
      description: 'Structured training programs for all levels, from beginner to advanced.',
      icon: '💪',
      link: '/pages/education/workouts'
    },
    {
      id: 'habit-builder',
      title: 'Habit Builder',
      description: 'Build sustainable training routines that fit your lifestyle and stick.',
      icon: '📅',
      link: '/pages/education/habit-builder'
    },
    {
      id: 'product-reviews',
      title: 'Product Reviews',
      description: 'In-depth analysis of training equipment, accessories and fitness gear.',
      icon: '⭐',
      link: '/pages/education/product-reviews'
    }
  ];

  return (
    <div className="education-hub">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Education Hub
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            Your learning center. Guides, plans and reviews—all in one place.
          </p>
          <p className="mt-4 text-lg text-gray-400">
            Clear. To the point. Focused on real progress.
          </p>
        </div>
      </section>

      {/* Purpose and Messaging */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            The Education Hub gathers everything you need to maximize your training.
            Whether you're testing your baseline strength, following a structured program,
            or building daily habits that stick—we've got clear, actionable content to
            help you progress.
          </p>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="group relative rounded-2xl bg-white p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-semibold">
                  Explore <span className="ml-2 group-hover:ml-3 transition-all">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="search"
              placeholder="Search articles, workouts, guides..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
              type="button"
              className="w-full md:w-auto rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Filter by topic:</span>
            {['Beginner', 'Intermediate', 'Advanced', 'Mobility', 'Strength', 'Endurance'].map((tag) => (
              <button
                key={tag}
                className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'The Complete Beginner&apos;s Pull-Up Guide',
                category: 'Workouts',
                readTime: '8 min read',
                image: '/placeholder-article-1.jpg'
              },
              {
                title: 'Building a Daily Training Habit in 30 Days',
                category: 'Habit Builder',
                readTime: '5 min read',
                image: '/placeholder-article-2.jpg'
              },
              {
                title: 'How to Test Your Max Pull-Ups',
                category: 'Fitness Tests',
                readTime: '6 min read',
                image: '/placeholder-article-3.jpg'
              }
            ].map((article, idx) => (
              <article key={idx} className="rounded-xl bg-white overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Article Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="text-blue-600 font-semibold">{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <Link
                    to="#"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Read article <span className="ml-2">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture / Newsletter */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <Newsletter
            title="Get weekly training tips"
            description="Join 10,000+ athletes getting our best content delivered weekly."
          />
        </div>
      </section>
    </div>
  );
}
