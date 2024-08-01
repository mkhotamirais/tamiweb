import { AdminGate } from "@/components/auth/route-gates";
import { AddProductForm } from "../_components/add-product-form";

export default function AddProductPage() {
  return (
    <AdminGate>
      <AddProductForm />;
    </AdminGate>
  );
}
