import { getProducts } from "@/actions/productAction";
import { currentRole } from "@/lib/currentAuth";
import { ProductListClient } from "./product-list-client";

export async function ProductList({ q }: { q: string }) {
  const data = await getProducts(q);
  const role = await currentRole();
  return <ProductListClient data={data} role={role} />;
}
