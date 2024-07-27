"use client";

import { useProducStore } from "@/hooks/useProduct";
import { Product, UserRole } from "@prisma/client";
import React from "react";
import { FormError, FormSuccess } from "../form-message";
import { Button } from "../ui/button";
import Link from "next/link";
import DeleteProductButton from "./delete-product-btn";

export function ProductListClient({ data, role }: { data: Product[] | null; role: UserRole | undefined }) {
  const { errorMsg, successMsg } = useProducStore();
  if (data?.length === 0) return <div className="flex justify-center mt-8 italic">No data found</div>;

  return (
    <div className="py-2">
      <FormSuccess message={successMsg} />
      <FormError message={errorMsg} />
      <div className="grid grid-cols-1 gap-2 my-4">
        {data
          ?.sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())
          ?.map((item) => (
            <div key={item.id} className="border rounded flex justify-between items-center px-3">
              <div className="p-2 flex justify-start flex-col items-start gap-2">
                <div className="capitalize text-lg font-bold">{item.name}</div>
                <div className="">Rp{item.price}</div>
              </div>
              {role === "ADMIN" && (
                <div className="flex *:w-16">
                  <Button size="sm" asChild className="rounded-none">
                    <Link href={`/product/edit/${item.id}`}>Edit</Link>
                  </Button>
                  <DeleteProductButton id={item.id} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
