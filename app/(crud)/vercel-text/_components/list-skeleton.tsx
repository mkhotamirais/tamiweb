export function ListSkeleton() {
  return (
    <div className="animate-pulse">
      {Array(7)
        .fill(7)
        .map((_, i) => (
          <div key={i} className="relative group grid grid-cols-1 sm:grid-cols-4 border p-2 rounded my-1">
            <h2 className="col-span-1 capitalize font-semibold h-4 w-16 bg-gray-200 rounded-full" />
            <div className="col-span-3 flex flex-col gap-1">
              <p className="text-neutral-500 h-4 w-full bg-gray-300 rounded-full" />
              <p className="text-neutral-500 h-4 w-1/2 bg-gray-300 rounded-full" />
            </div>
          </div>
        ))}
    </div>
  );
}
