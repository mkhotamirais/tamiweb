import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-3xl bg-white px-3 mx-auto min-h-screen border-x shadow">
        <header className="z-50 sticky top-0 bg-white h-16 border-b flex items-center justify-between">
          <Link href="/product">Product</Link>
          <nav className="flex gap-6 items-center">
            <Link href="/product/add">
              <Button size="sm">Add Product</Button>
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
