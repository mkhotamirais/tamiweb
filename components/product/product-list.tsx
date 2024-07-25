import { getProducts } from "@/actions/productAction";
import ProductListClient from "./product-list-client";

export async function ProductList({ q }: { q: string }) {
  const data = await getProducts(q);
  return <ProductListClient data={data} />;
}
