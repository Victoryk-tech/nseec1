export default function ArticleSkeleton() {
  return (
    <div className="max-w-[100rem] mx-auto animate-pulse">
      {/* Hero placeholder */}
      <div className="w-full h-[55vh] min-h-[380px] max-h-[640px] bg-gray-200" />

      <div className="px-4 sm:px-6 lg:px-12 py-10">
        <div className="flex flex-col xl:flex-row gap-10 max-w-[100rem] mx-auto">
          {/* Left sidebar */}
          <aside className="hidden xl:block xl:w-64 flex-shrink-0">
            <div className="bg-gray-100 rounded-2xl h-48" />
          </aside>

          {/* Article body */}
          <main className="flex-1 min-w-0 max-w-3xl mx-auto xl:mx-0 space-y-4">
            <div className="h-7 bg-gray-200 rounded w-full" />
            <div className="h-7 bg-gray-200 rounded w-4/5" />
            <div className="h-5 bg-gray-100 rounded w-full mt-6" />
            <div className="h-5 bg-gray-100 rounded w-4/5" />
            <div className="h-5 bg-gray-100 rounded w-3/4" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded" />
            ))}
          </main>

          {/* Right sidebar */}
          <aside className="hidden xl:block xl:w-72 flex-shrink-0 space-y-4">
            <div className="bg-gray-200 rounded-2xl h-36" />
            <div className="bg-gray-100 rounded-2xl h-28" />
          </aside>
        </div>
      </div>
    </div>
  )
}
