"use client";

import React from "react";
import { Button } from "../ui/button";
import { useProducStore } from "@/hooks/useProduct";
import { useTransition } from "react";
import { deleteProduct } from "@/actions/productAction";

export default function DeleteProductButton({ id }: { id: string }) {
  const { setSuccessMsg, setErrorMsg } = useProducStore();
  const [isPending, startTransition] = useTransition();

  const onDelete = (id: string) => {
    setSuccessMsg("");
    setErrorMsg("");
    startTransition(() => {
      deleteProduct(id)
        .then((data) => {
          if (data?.success) {
            setSuccessMsg(data.success);
          }
          if (data?.error) {
            setErrorMsg(data.error);
          }
        })
        .catch(() => {
          setErrorMsg("terjadi kesalahan");
        });
    });
  };

  return (
    <Button disabled={isPending} onClick={() => onDelete(id)} size="sm" variant="destructive" className="rounded-none">
      Delete
    </Button>
  );
}
