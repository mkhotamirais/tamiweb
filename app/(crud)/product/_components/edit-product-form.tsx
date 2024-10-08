"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductSchema } from "@/schemas/productSchema";
import { editProduct } from "@/actions/productAction";
import { useState, useTransition } from "react";
import { FormError, FormSuccess } from "@/components/form-message";
import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client";
import { useProducStore } from "@/hooks/useProduct";

export function EditProductForm({ id, data }: { id: string; data: Product | null }) {
  const { successMsg, errorMsg, setErrorMsg, setSuccessMsg } = useProducStore();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: data?.name || undefined, price: data?.price || undefined },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    setErrorMsg("");
    setSuccessMsg("");
    startTransition(() => {
      editProduct(id, values)
        .then((data) => {
          if (data?.error) {
            setErrorMsg(data?.error);
          }
          if (data?.success) {
            setSuccessMsg(data?.success);
            router.push("/product");
          }
        })
        .catch(() => {
          setErrorMsg("Something went wrong");
        });
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="font-bold text-2xl text-center mb-3">Edit Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} placeholder="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} placeholder="1000" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={errorMsg} />
          <FormSuccess message={successMsg} />
          <Button disabled={isPending} type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
