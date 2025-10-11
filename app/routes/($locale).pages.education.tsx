import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta, flattenConnection, Image} from '@shopify/hydrogen';
import type {MetaArgs} from '@shopify/remix-oxygen';
import {Link} from '~/components/Link';
import {Newsletter} from '~/components/Newsletter';
import {Heading, Text} from '~/components/Text';
import type {ArticleFragment} from 'storefrontapi.generated';
import {useState} from 'react';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // Fetch articles from all blogs
  const blogHandles = ['news', 'workouts', 'product-reviews', 'fitness-tests', 'habit-builder', 'technique', 'nutrition', 'recovery'];

  const allArticles = await Promise.all(
    blogHandles.map(async (handle) => {
      try {
        const {blog} = await storefront.query(EDUCATION_BLOGS_QUERY, {
          variables: {
            blogHandle: handle,
            pageBy: 50,
          },
        });

        if (blog?.articles) {
          const articles = flattenConnection(blog.articles);
          // Add blog handle to each article for filtering
          return articles.map((article: any) => ({
            ...article,
            blogHandle: handle,
          }));
        }
        return [];
      } catch (error) {
        console.error(`Error fetching blog: ${handle}`, error);
        return [];
      }
    })
  );

  const articles = allArticles.flat();

  return json({
    articles,
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
  const {articles} = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'news',
      title: 'News',
      description: 'Latest updates, announcements, and insights from Trahere.',
      icon: '📰',
      blogHandle: 'news'
    },
    {
      id: 'workouts',
      title: 'Workouts',
      description: 'Structured training programs for all levels, from beginner to advanced.',
      icon: '💪',
      blogHandle: 'workouts'
    },
    {
      id: 'product-reviews',
      title: 'Product Reviews',
      description: 'Honest reviews and comparisons of pull-up bars and training equipment.',
      icon: '⭐',
      blogHandle: 'product-reviews'
    },
    {
      id: 'fitness-tests',
      title: 'Fitness Tests',
      description: 'Benchmark your progress with standardized pull-up and strength assessments.',
      icon: '📊',
      blogHandle: 'fitness-tests'
    },
    {
      id: 'habit-builder',
      title: 'Habit Builder',
      description: 'Build consistent training habits and develop long-term discipline.',
      icon: '🎯',
      blogHandle: 'habit-builder'
    },
    {
      id: 'technique',
      title: 'Technique',
      description: 'Master proper form and biomechanics for injury-free training.',
      icon: '🔧',
      blogHandle: 'technique'
    },
    {
      id: 'nutrition',
      title: 'Nutrition',
      description: 'Fuel your training with evidence-based nutrition strategies.',
      icon: '🥗',
      blogHandle: 'nutrition'
    },
    {
      id: 'recovery',
      title: 'Recovery',
      description: 'Optimize rest, sleep, and recovery protocols for peak performance.',
      icon: '😴',
      blogHandle: 'recovery'
    }
  ];

  // Filter articles based on search and category
  const filteredArticles = articles.filter((article: any) => {
    const matchesSearch = searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.contentHtml?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? article.blogHandle === categories.find(cat => cat.id === selectedCategory)?.blogHandle
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 text-primary py-16 md:py-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <Heading as="h1" className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Education Hub
          </Heading>
          <Text className="text-xl md:text-2xl text-primary/80 mb-4 max-w-3xl mx-auto">
            Evidence-based training knowledge. Clear, actionable, focused on results.
          </Text>
          <Text className="text-lg text-primary/60">
            From biomechanics to nutrition—everything you need to train smarter.
          </Text>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-900 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="search"
              placeholder="Search articles, guides, and workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-primary placeholder:text-primary/40 focus:ring-2 focus:ring-[rgb(var(--color-accent))] focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="w-full md:w-auto btn-accent !py-3 !px-6 text-base font-semibold"
            >
              {searchQuery ? 'Clear' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Browse by Category
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`group relative rounded-2xl p-8 border transition-all text-left ${
                  selectedCategory === category.id
                    ? 'bg-[rgb(var(--color-accent))]/10 border-[rgb(var(--color-accent))] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                  selectedCategory === category.id
                    ? 'text-[rgb(var(--color-accent))]'
                    : 'text-primary group-hover:text-[rgb(var(--color-accent))]'
                }`}>
                  {category.title}
                </h3>
                <p className="text-primary/70 leading-relaxed">
                  {category.description}
                </p>
                {selectedCategory === category.id && (
                  <div className="mt-4 text-sm text-[rgb(var(--color-accent))] font-semibold">
                    ✓ Active Filter
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-20 bg-black border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <Heading as="h2" className="text-3xl md:text-4xl font-bold text-primary">
              {selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.title} Articles`
                : 'All Articles'}
            </Heading>
            <Text className="text-primary/60">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </Text>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article: ArticleFragment) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-12">
                <Text className="text-2xl text-primary/60">
                  No articles found
                </Text>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="btn-accent !py-2.5 !px-6 text-sm font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900 border-t border-white/10">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <Newsletter
            title="Get weekly training insights"
            description="Join thousands of athletes getting evidence-based training content delivered weekly."
          />
        </div>
      </section>
    </div>
  );
}

function ArticleCard({article}: {article: any}) {
  return (
    <Link
      to={`/blogs/${article.blogHandle}/${article.handle}`}
      className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[rgb(var(--color-accent))]/50 transition-all hover:bg-white/10"
    >
      {article.image ? (
        <div className="aspect-video bg-gray-900 overflow-hidden">
          <Image
            data={article.image}
            alt={article.image.altText || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <Text className="text-primary/40 text-sm">No image</Text>
        </div>
      )}
      <div className="p-6">
        {article.author?.name && (
          <div className="flex items-center gap-2 text-sm text-primary/60 mb-2">
            <span className="text-[rgb(var(--color-accent))] font-semibold">{article.author.name}</span>
          </div>
        )}
        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-[rgb(var(--color-accent))] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center text-[rgb(var(--color-accent))] font-semibold text-sm">
          Read article
          <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

const EDUCATION_BLOGS_QUERY = `#graphql
  query EducationBlogs(
    $blogHandle: String!
    $pageBy: Int!
  ) {
    blog(handle: $blogHandle) {
      articles(first: $pageBy) {
        edges {
          node {
            id
            title
            handle
            contentHtml
            image {
              id
              altText
              url
              width
              height
            }
            author: authorV2 {
              name
            }
            tags
            publishedAt
          }
        }
      }
    }
  }
`;

