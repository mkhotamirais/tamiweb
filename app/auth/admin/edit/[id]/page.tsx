import { EditUserForm } from "@/app/auth/_components/edit-user-form";
import { getUserById } from "@/data/authData";

export default async function EditUserPage({ params: { id } }: { params: { id: string } }) {
  const user = await getUserById(id);
  return (
    <div className="px-3 my-3">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl text-center font-semibold my-3">Edit User</h1>
        <EditUserForm user={user} />
      </div>
    </div>
  );
}
