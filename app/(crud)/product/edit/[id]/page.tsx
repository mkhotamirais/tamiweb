import { getProductById } from "@/actions/productAction";
import { notFound } from "next/navigation";
import { EditProductForm } from "../../_components/edit-product-form";

export default async function EditProductPage({ params: { id } }: { params: { id: string } }) {
  const data = await getProductById(id);
  if (!data) {
    notFound();
  }
  return <EditProductForm id={id} data={data} />;
}
