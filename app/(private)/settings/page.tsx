import { currentUser } from "@/lib/currentAuth";

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-xl bg-white mx-auto min-h-screen">
        <div>email: {user.name}</div>
        <div>email: {user.email}</div>
        <div>email: {user.role}</div>
        <div>email: {user.email}</div>
      </div>
    </div>
  );
}
