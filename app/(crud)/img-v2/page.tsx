import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { List } from "./_components/list";

export default function ImgV2Page() {
  return (
    <div>
      <div className="flex justify-between items-center py-1">
        <div>search</div>
        <Button asChild>
          <Link href="/img-v2/post">Add Image</Link>
        </Button>
      </div>
      <Separator />
      <List />
    </div>
  );
}
