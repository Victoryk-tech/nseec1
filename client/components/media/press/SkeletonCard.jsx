export function SkeletonCard() {
  return (
    <div className="flex gap-0 bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="w-52 flex-shrink-0 h-36 bg-gray-200" />
      <div className="flex-1 p-5 space-y-3">
        <div className="h-3 bg-gray-100 rounded-full w-24" />
        <div className="h-5 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-3/4" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10 animate-pulse">
      <div className="h-3 bg-gray-100 rounded w-52 mb-8" />
      <div className="w-full h-[420px] bg-gray-200 mb-10" />
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-24" />
          <div className="h-6 bg-gray-100 rounded-full w-20" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-5/6" />
        <div className="h-10 bg-gray-200 rounded w-4/6" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}
