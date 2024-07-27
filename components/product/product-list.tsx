import { getProducts } from "@/actions/productAction";
import { ProductListClient } from "./product-list-client";
import { currentRole } from "@/lib/currentAuth";

export async function ProductList({ q }: { q: string }) {
  const data = await getProducts(q);
  const role = await currentRole();
  return <ProductListClient data={data} role={role} />;
}
