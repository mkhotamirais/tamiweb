import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteModal } from "./delete-modal";
import { getTexts } from "@/actions/vercel-text";

export async function TextList({ q, currentPage }: { q: string; currentPage: number }) {
  const texts = await getTexts(q, currentPage);

  if (texts?.length === 0) {
    return <div>Data kosong</div>;
  }
  return (
    <div>
      {texts?.map((text) => (
        <div key={text.id} className="relative group grid grid-cols-1 sm:grid-cols-4 border p-2 rounded my-1">
          <h2 className="col-span-1 capitalize font-semibold">{text.title}</h2>
          <p className="col-span-3 text-neutral-500">{text.description}</p>
          <div className="hidden group-hover:flex absolute inset-0 items-center justify-center bg-black/15 backdrop-blur-sm">
            <div className="flex gap-2">
              <Button asChild size="sm">
                <Link href={`/vercel-text/update/${text.id}`}>
                  <Edit className="mr-2 w-4 h-4" /> Edit
                </Link>
              </Button>
              <DeleteModal text={text} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
