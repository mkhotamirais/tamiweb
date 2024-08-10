"use client";

import { deleteImage } from "@/actions/vercel-img-v1";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImgV1 } from "@prisma/client";
import { Trash } from "lucide-react";
import React from "react";

export function DeleteButton({ data }: { data: ImgV1 }) {
  const deleteImageById = deleteImage.bind(null, data.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Trash className="size-4 text-red-500 hover:text-red-700" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete <span className="font-semibold italic">{data.name}</span>, are you sure?
          </DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
        </DialogHeader>
        <form action={deleteImageById}>
          <div className="flex gap-2">
            <Button type="submit" variant="destructive" size="sm">
              Delete
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
