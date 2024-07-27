import { AdminGate } from "@/components/auth/route-gates";
import { AddProductForm } from "@/components/product/add-product-form";

export default function AddProductPage() {
  return (
    <AdminGate>
      <AddProductForm />;
    </AdminGate>
  );
}
