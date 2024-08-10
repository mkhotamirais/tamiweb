"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ImgV2Schema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash } from "lucide-react";
import { postImageV2 } from "@/actions/vercel-img-v2";

type formValues = z.infer<typeof ImgV2Schema>;

export default function ImgV2PostForm() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [pending, startTransition] = useTransition();

  const form = useForm<formValues>({
    resolver: zodResolver(ImgV2Schema),
    defaultValues: { name: "", image: undefined },
  });

  const onSubmit = (values: formValues) => {
    console.log(values);
    startTransition(() => {
      postImageV2(values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post Image</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="name" />
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
                    disabled={pending}
                    type="file"
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
          <Avatar className="rounded-md w-32 h-32 relative">
            {preview && (
              <Button
                className="absolute"
                onClick={() => {
                  setPreview(undefined);
                  form.setValue("image", undefined);
                }}
              >
                <Trash />
              </Button>
            )}
            <AvatarImage src={preview || ""} className="rounded-md object-contain bg-gray-200" />
            <AvatarFallback className="rounded-md">bu</AvatarFallback>
          </Avatar>
          <Button disabled={pending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
