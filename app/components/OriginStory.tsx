export function OriginStory() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why we built the TB7
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Born from frustration with generic equipment that didn't work.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <p className="text-gray-700 leading-relaxed mb-6">
              Like many fitness enthusiasts, we struggled with traditional
              pull-up bars. Narrow grips caused shoulder pain. Installation
              required drilling holes. Door frames got damaged. Bars wobbled
              under weight.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We knew there had to be a better way. After months of research,
              prototyping, and testing, we developed the TB7—a pull-up bar that
              solves every problem we encountered.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The TB7's wide 24-inch grip matches the natural width of your
              shoulders, eliminating strain. Tool-free installation takes 10
              seconds. Protective padding prevents door damage. And after
              laboratory testing to 573 pounds, we knew we had something special.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24"</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Wide Grip
              </p>
              <p className="text-xs text-gray-600">
                Matches natural shoulder width
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">573 lb</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Lab Tested
              </p>
              <p className="text-xs text-gray-600">
                Exceeds commercial standards
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10 sec</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Installation
              </p>
              <p className="text-xs text-gray-600">
                No tools or drilling required
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900 text-center italic">
            "We don't just sell equipment—we solve problems. Every feature of
            the TB7 exists because we experienced the frustration ourselves and
            refused to accept 'good enough.'"
          </p>
        </div>
      </div>
    </section>
  );
}
