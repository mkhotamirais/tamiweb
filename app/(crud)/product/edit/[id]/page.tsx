import { getProductById } from "@/actions/productAction";
import { EditProductForm } from "@/components/product/edit-product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params: { id } }: { params: { id: string } }) {
  const data = await getProductById(id);
  if (!data) {
    notFound();
  }
  return <EditProductForm id={id} data={data} />;
}
