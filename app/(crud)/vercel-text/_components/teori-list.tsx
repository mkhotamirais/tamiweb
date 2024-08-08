import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteTeoriModal } from "./delete-teori-modal";
import { getTeoris } from "@/actions/vercel-text";

export async function TeoriList({ q, currentPage }: { q: string; currentPage: number }) {
  const teoris = await getTeoris(q, currentPage);

  if (teoris?.length === 0) {
    return <div>Data kosong</div>;
  }
  return (
    <div>
      {teoris?.map((teori) => (
        <div key={teori.id} className="relative group grid grid-cols-1 sm:grid-cols-4 border p-2 rounded my-1">
          <h2 className="col-span-1 capitalize font-semibold">{teori.title}</h2>
          <p className="col-span-3 text-neutral-500">{teori.description}</p>
          <div className="hidden group-hover:flex absolute inset-0 items-center justify-center bg-black/15 backdrop-blur-sm">
            <div className="flex gap-2">
              <Button asChild size="sm">
                <Link href={`/teori/update/${teori.id}`}>
                  <Edit className="mr-2 w-4 h-4" /> Edit
                </Link>
              </Button>
              <DeleteTeoriModal teori={teori} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
