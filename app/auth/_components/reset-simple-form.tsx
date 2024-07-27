"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ResetSimpleSchema } from "@/schemas/authSchema";
import Link from "next/link";
import { resetSimple } from "@/actions/authAction";
import { FormError, FormSuccess } from "@/components/form-message";

export function ResetSimpleForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSimpleSchema>>({
    resolver: zodResolver(ResetSimpleSchema),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = (values: z.infer<typeof ResetSimpleSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetSimple(values)
        .then((data) => {
          if (data?.success) {
            setSuccess(data.success);
            form.reset();
          }
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch(() => setError("something went wrong"));
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg max-auto p-4 rounded-xl border shadow">
        <h1 className="text-xl text-center font-bold mb-4">Reset Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="youremail@gmail.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-0 right-0"
                        variant="ghost"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button disabled={isPending} type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
        <Button disabled={isPending} asChild className="w-full mt-4" variant="link">
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </div>
    </div>
  );
}
