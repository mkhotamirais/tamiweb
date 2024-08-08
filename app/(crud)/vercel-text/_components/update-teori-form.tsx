"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TeoriSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Teori } from "@prisma/client";
import { updateTeori } from "@/actions/vercel-text";

type formValue = z.infer<typeof TeoriSchema>;

export function UpdateTeoriForm({ teori }: { teori: Teori | null }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<formValue>({
    resolver: zodResolver(TeoriSchema),
    defaultValues: { title: teori?.title || "", description: teori?.description || "" },
  });

  const router = useRouter();

  const onSubmit = (values: formValue) => {
    startTransition(() => {
      updateTeori(teori?.id, values)
        .then((res) => {
          form.reset();
          if (res?.success) {
            form.reset(values);
            router.push(`/teori`);
            router.refresh();
            toast.success(res.success);
          }
          res?.error && toast.error(res.error);
        })
        .catch((err) => {
          toast.error(err?.error);
        });
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea disabled={pending} {...field} placeholder="description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
