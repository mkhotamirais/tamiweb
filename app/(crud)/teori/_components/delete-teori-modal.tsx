"use client";

import { deleteTeori } from "@/actions/teori";
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
import { Teori } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export function DeleteTeoriModal({ teori }: { teori: Teori }) {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteTeori(teori?.id).then((res) => {
      if (res?.success) {
        toast.success(res.success);
        router.refresh();
      }
      res?.error && toast.error(res.error);
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash className="mr-2 w-4 h-4" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {teori?.title}</DialogTitle>
          <DialogDescription className="text-lg">Are you sure?</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Button type="submit" variant="destructive" size="sm">
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
