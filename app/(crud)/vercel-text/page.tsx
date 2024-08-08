import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { TeoriList } from "./_components/teori-list";
import { TeoriListSkeleton } from "./_components/teori-list-skeleton";
import { TeoriSearch } from "./_components/teori-search";
import TeoriPaginasi from "./_components/teori-paginasi";
import { getTeorisPerPage } from "@/actions/vercel-text";

export default async function TeoriPage({
  searchParams: { q = "", page },
}: {
  searchParams: { q: string; page: string };
}) {
  const currentPage = Number(page) || 1;

  const totalPages = (await getTeorisPerPage(q)) || 1;

  return (
    <div>
      <div className="flex justify-between items-center my-2 gap-3">
        <TeoriSearch />
        <Button asChild>
          <Link href="/teori/post">
            <Plus className="mr-2 w-4 h-4" />
            Add Data
          </Link>
        </Button>
      </div>
      <Separator />
      <TeoriPaginasi totalPages={totalPages} />
      <Suspense key={q + currentPage} fallback={<TeoriListSkeleton />}>
        {/* <TeoriListSkeleton /> */}
        <TeoriList q={q} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
