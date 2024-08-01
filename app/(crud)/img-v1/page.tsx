import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImageItems } from "./_components/image-items";
import { Suspense } from "react";
import { LoaderPulse } from "@/components/loader-pulse";

export default async function UploadImagePage() {
  return (
    <>
      <div className="my-2 flex justify-between">
        <Button asChild>
          <Link href="/img-v1/add">Add Image</Link>
        </Button>
      </div>
      <Suspense fallback={<LoaderPulse />}>
        <ImageItems />
      </Suspense>
    </>
  );
}
