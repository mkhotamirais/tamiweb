import { getContactPages } from "@/actions/contact-app";
import { ContactList } from "@/components/contact-app/contact-list";
import { Pagination } from "@/components/contact-app/pagination";
import { SearchContact } from "@/components/contact-app/search-contact";
import { SkeletonContact } from "@/components/contact-app/skeleton-contact";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default async function ContactApp({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getContactPages(query);

  return (
    <div>
      <nav className="z-50 flex flex-col gap-2 sm:flex-row sticky top-0 justify-between py-2 bg-white border-b shadow px-3">
        <div className="flex w-full flex-row justify-between items-center">
          <Link href="/contact-app">ContactApp</Link>
          <div className="flex gap-3">
            <SearchContact className="hidden sm:block" />
            <Button asChild>
              <Link href="/contact-app/add">Add Contact</Link>
            </Button>
          </div>
        </div>
        <SearchContact className="block sm:hidden" />
      </nav>
      <main className="px-3 my-3">
        <h1 className="text-2xl font-semibold my-4 text-center">Contact List</h1>
        <Pagination totalPages={totalPages} />
        <Suspense key={query + currentPage} fallback={<SkeletonContact />}>
          <ContactList query={query} currentPage={currentPage} />
        </Suspense>
      </main>
    </div>
  );
}
