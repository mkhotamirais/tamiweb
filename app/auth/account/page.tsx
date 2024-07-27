import { currentUser } from "@/lib/currentAuth";
import { AccountForm } from "../_components/account-form";
import { string } from "zod";

export default async function AccountPage() {
  const user = await currentUser();

  if (!user) {
    return <div>no user found</div>;
  }

  return (
    <div className="px-3">
      <h1 className="text-center text-2xl my-4 font-semibold">Your Account</h1>
      <AccountForm user={user} />
    </div>
  );
}
