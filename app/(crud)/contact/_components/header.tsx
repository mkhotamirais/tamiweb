import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContactHeader() {
  return (
    <header className="z-50 bg-white sticky top-0 border-b h-16 flex justify-between items-center">
      <Link href="/contact" className="text-2xl font-bold">
        Contact
      </Link>
      <nav>
        <Button asChild size="sm">
          <Link href="/contact/add">Add Contact</Link>
        </Button>
      </nav>
    </header>
  );
}
