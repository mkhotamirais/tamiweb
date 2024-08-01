"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductSchema } from "@/schemas/productSchema";
import { addProduct } from "@/actions/productAction";
import { ChangeEvent, useState, useTransition } from "react";
import { FormError, FormSuccess } from "@/components/form-message";
import { useRouter } from "next/navigation";
import { useProducStore } from "@/hooks/useProduct";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// function getImageData(e: ChangeEvent<HTMLInputElement>) {
//   const dataTransfer = new DataTransfer();
//   Array.from(e.target.files!).forEach((image) => dataTransfer.items.add(image));
//   const files = dataTransfer.files;
//   // const files = e.target.files?.[0];
//   const displayUrl = URL.createObjectURL(e.target.files![0]);
//   return { files, displayUrl };
// }

export function AddProductForm() {
  const [preview, setPreview] = useState("");
  const { errorMsg, successMsg, setErrorMsg, setSuccessMsg } = useProducStore();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof ProductSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: "", price: 0, image: undefined },
  });

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    // console.log(values);
    startTransition(() => {
      // const formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("price", values.price.toString());
      // if (values.image instanceof File) {
      //   formData.append("image", values.image);
      // }
      // console.log(formData);

      addProduct(values);
      // .then((data) => {
      //   if (data?.error) {
      //     setSuccessMsg(data?.error);
      //   }
      //   if (data?.success) {
      //     setSuccessMsg(data?.success);
      //     router.push("/product");
      //   }
      // })
      // .catch(() => {
      //   setErrorMsg("Something went wrong");
      // });
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="font-bold text-2xl text-center mb-3">Add Product</h1>
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

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    // {...field}
                    disabled={isPending}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Avatar className="w-32 h-32 rounded-sm">
            <AvatarImage src={preview} className="object-cover object-center" />
            <AvatarFallback className="rounded-sm">BU</AvatarFallback>
          </Avatar>
          <FormError message={errorMsg} />
          <FormSuccess message={successMsg} />
          <Button disabled={isPending} type="submit">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
