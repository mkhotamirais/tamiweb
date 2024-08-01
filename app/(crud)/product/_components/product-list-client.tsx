"use client";

import { useProducStore } from "@/hooks/useProduct";
import { Product, UserRole } from "@prisma/client";
import React from "react";
import { FormError, FormSuccess } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteProductButton } from "./delete-product-btn";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FaInfo, FaPenToSquare, FaPhone, FaTrashCan } from "react-icons/fa6";
import Image from "next/image";

export function ProductListClient({ data, role }: { data: Product[] | null; role: UserRole | undefined }) {
  const { errorMsg, successMsg } = useProducStore();
  if (data?.length === 0) return <div className="flex justify-center mt-8 italic">No data found</div>;

  return (
    <div className="py-2 mb-16">
      <FormSuccess message={successMsg} />
      <FormError message={errorMsg} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        {data?.map((item) => (
          <Card className="" key={item.id}>
            <CardContent className="p-3 flex flex-col gap-3 items-center">
              <Image
                src={item?.image || "/images/—Pngtree—shopping cart convenient icon_4637407.png"}
                width={200}
                height={200}
                alt="product image"
                priority
                className="w-28 h-28 object-center object-cover rounded-full shadow"
              />
              <div className="flex flex-col items-center">
                <h2>{item.name}</h2>
                <p>Rp{item?.price?.toLocaleString("id-ID")}</p>
              </div>
              {role === "ADMIN" && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <FaInfo />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full bg-cyan-500">
                    <FaPenToSquare />
                  </Button>
                  <Button variant="destructive" size="sm" className="rounded-full">
                    <FaTrashCan />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 gap-2 my-4">
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
      </div> */}
    </div>
  );
}
