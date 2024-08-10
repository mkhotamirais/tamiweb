import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { TextSearch } from "./_components/text-search";
import { TextPaginasi } from "./_components/paginasi";
import { ListSkeleton } from "./_components/list-skeleton";
import { TextList } from "./_components/text-list";
import { getTexts, getTextsPerPage } from "@/actions/vercel-text";

type TextPageProps = { searchParams: { q: string; page: string } };

export default async function TextPage({ searchParams: { q = "", page } }: TextPageProps) {
  const currentPage = Number(page) || 1;
  const texts = await getTexts(q, currentPage);

  const totalPages = (await getTextsPerPage(q)) || 1;

  return (
    <div>
      <div className="flex justify-between items-center my-2 gap-1">
        <TextSearch texts={texts} />
        <Button asChild>
          <Link href="/vercel-text/post">
            <Plus className="mr-2 w-4 h-4" />
            Add Data
          </Link>
        </Button>
      </div>
      <Separator />
      {texts && texts?.length > 0 && <TextPaginasi totalPages={totalPages} />}
      <Suspense key={q + currentPage} fallback={<ListSkeleton />}>
        {/* <ListSkeleton /> */}
        <TextList q={q} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
