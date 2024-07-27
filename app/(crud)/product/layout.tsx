import { Button } from "@/components/ui/button";
import { currentRole } from "@/lib/currentAuth";
import Link from "next/link";

export default async function ProductLayout({ children }: { children: React.ReactNode }) {
  const role = await currentRole();
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-3xl bg-white px-3 mx-auto min-h-screen border-x shadow">
        <header className="z-50 sticky top-0 bg-white h-16 border-b flex items-center justify-between">
          <Link href="/product" className="text-2xl font-bold uppercase">
            Product
          </Link>
          {role === "ADMIN" && (
            <nav className="flex gap-6 items-center">
              <Link href="/product/add">
                <Button size="sm">Add Product</Button>
              </Link>
            </nav>
          )}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
