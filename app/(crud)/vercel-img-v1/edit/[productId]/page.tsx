import { getImageById } from "@/actions/vercel-img-v1";
import EditUploadImageForm from "../../_components/edit-image-form";

export default async function EditImagePage({ params: { productId } }: { params: { productId: string } }) {
  const image = await getImageById(productId);

  if (!image) {
    return <div>image not found</div>;
  }

  return <EditUploadImageForm data={image} />;
}
