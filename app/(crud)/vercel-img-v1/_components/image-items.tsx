import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { ImgV1 } from "@prisma/client";
import { getImages } from "@/actions/vercel-img-v1";

export async function ImageItems() {
  const images = await getImages();

  if (images?.length === 0) {
    return <div>Image is empty</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 gap-y-4">
      {images?.map((data: ImgV1) => (
        <div key={data.id} className="relative group">
          <Avatar className="rounded-sm w-full h-32">
            <AvatarImage src={data.image || ""} className="rounded-sm object-cover" />
            <AvatarFallback className="rounded-sm animate-pulse">
              {data.name.toUpperCase().substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-center bg-gray-200 mt-1 p-1 rounded-md capitalize">{data.name}</h2>
          <div className="hidden group-hover:flex gap-1 absolute top-1 right-1">
            <Button variant="outline" size="icon" className="text-green-500 hover:text-green-700 rounded-full">
              <Link href={`/vercel-img-v1/edit/${data.id}`} className="">
                <Edit className="size-4 " />
              </Link>
            </Button>
            <DeleteButton data={data} />
          </div>
        </div>
      ))}
    </div>
  );
}
