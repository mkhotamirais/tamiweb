"use client";

import { AuthCard } from "./auth-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { z } from "zod";
import { LoginSchema } from "@/schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError, FormSuccess } from "./auth-message";
import { login } from "@/actions/authAction";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("something went wronggg"));
    });
  };

  return (
    <AuthCard
      backHref="/auth/register"
      backLabel="Don't have an account?"
      title="Login"
      titleDesc="Choose login method"
      showSocial
    >
      <div className="relative mb-4">
        <div className="absolute z-0 h-[2px] w-full bg-gray-300 top-1/2 -translate-y-1/2" />
        <div className="relative z-10 bg-white w-fit mx-auto px-3 text-sm text-gray-500">Or login with email</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="12345" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} placeholder="example@gmail.com" type="email" />
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
                    <FormLabel>Password</FormLabel>
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
              <Button variant="link" size="sm" asChild className="px-0 font-normal">
                {/* <Link href="/auth/reset">Forgot password?</Link> */}
                <Link href="/auth/reset-simple">Forgot password?</Link>
              </Button>
            </>
          )}

          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
