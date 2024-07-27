import { AdminGate } from "@/components/auth/route-gates";
import { getUsers } from "@/actions/adminAction";
import { Dashboard } from "@/app/auth/_components/dashboard";

export default async function Admin1Page() {
  const users = await getUsers();

  return (
    <AdminGate>
      <Dashboard users={users} />
    </AdminGate>
  );
}
