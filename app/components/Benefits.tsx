export function Benefits() {
  const items = [
    {
      title: '2x more monthly reps',
      body: 'Customers log 120 more reps in 30 days.'
    },
    {
      title: 'Faster strength gains',
      body: 'Short sets that fit busy days.'
    },
    {
      title: 'Better daily routine',
      body: 'Mount, rep, unmount in under a minute.'
    },
    {
      title: 'Real muscle growth',
      body: 'Progressive overload with safe shoulder position.'
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-center">
        Why Trahere works
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div className="text-lg font-semibold">{it.title}</div>
            <p className="mt-2 text-sm text-neutral-600">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

