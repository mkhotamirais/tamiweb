"use client";

import { AuthCard } from "./auth-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError, FormSuccess } from "./auth-message";
import { register } from "@/actions/authAction";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values)
        .then((data) => {
          console.log(data);
          if (data?.success) {
            setSuccess(data?.success);
          }
          if (data?.error) {
            setError(data?.error);
          }
        })
        .catch(() => {
          setError("something went wrong");
        });
    });
  };

  return (
    <AuthCard
      backHref="/auth/login"
      backLabel="Already have an account?"
      title="Register"
      titleDesc="Create your account"
      showSocial={false}
    >
      {/* <div className="relative mb-4">
          <div className="absolute z-0 h-[2px] w-full bg-gray-300 top-1/2 -translate-y-1/2" />
          <div className="relative z-10 bg-white w-fit mx-auto px-3 text-sm text-gray-500">Or login with email</div>
        </div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} placeholder="your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type={showConfirmPassword ? "text" : "password"}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute top-0 right-0"
                      variant="ghost"
                    >
                      {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            // disabled={isPending || !form.formState.isValid}
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Register
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
