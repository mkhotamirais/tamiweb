import { currentUser } from "@/lib/currentAuth";
import { Suspense } from "react";
import { ProductList } from "./_components/product-list";
import { SearchProduct } from "./_components/search-product";
import { SkeletonProduct } from "./_components/skeleton-product";

export default async function ProductPage({ searchParams: { q } }: { searchParams: { q: string } }) {
  const user = await currentUser();
  return (
    <div className="py-2">
      <h1 className="text-center text-xl font-bold my-3">Product List</h1>
      <SearchProduct user={user} />
      <Suspense key={q} fallback={<SkeletonProduct />}>
        <ProductList q={q} />
      </Suspense>
    </div>
  );
}
