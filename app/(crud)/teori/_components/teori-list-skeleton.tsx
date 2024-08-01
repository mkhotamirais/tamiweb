export function TeoriListSkeleton() {
  return (
    <div className="animate-pulse">
      {Array(7)
        .fill(7)
        .map((_, i) => (
          <div key={i} className="relative group grid grid-cols-1 sm:grid-cols-4 border p-2 rounded my-1">
            <h2 className="col-span-1 capitalize font-semibold h-3 w-12 bg-gray-200" />
            <p className="col-span-3 text-neutral-500 h-3 w-full bg-gray-300" />
          </div>
        ))}
    </div>
  );
}
