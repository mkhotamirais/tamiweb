import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6";
import { AuthCard } from "@/components/auth/auth-card";

export function FormError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FaTriangleExclamation className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export function FormSuccess({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <FaCircleCheck className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export function AuthErrorCard() {
  return (
    <AuthCard title="Opps! something went wrong" backHref="/auth/login" backLabel="Back to login">
      <div className="w-full flex justify-center items-center">
        <FaTriangleExclamation className="text-destructive" />
      </div>
    </AuthCard>
  );
}
