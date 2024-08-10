"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TextSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Text } from "@prisma/client";
import { updateText } from "@/actions/vercel-text";

type formValue = z.infer<typeof TextSchema>;

export function UpdateForm({ text }: { text: Text | null }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<formValue>({
    resolver: zodResolver(TextSchema),
    defaultValues: { title: text?.title || "", description: text?.description || "" },
  });

  const router = useRouter();

  const onSubmit = (values: formValue) => {
    startTransition(() => {
      updateText(text?.id, values)
        .then((res) => {
          form.reset();
          if (res?.success) {
            form.reset(values);
            router.push(`/vercel-text`);
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
          <Button disabled={pending} type="submit" className="w-32">
            {pending ? "Processing.." : "Save"}
          </Button>{" "}
        </form>
      </Form>
    </div>
  );
}
