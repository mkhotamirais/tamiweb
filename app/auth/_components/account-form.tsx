"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { UserAccountSchema } from "@/schemas/authSchema";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { editMe } from "@/actions/adminAction";
import { FormError, FormSuccess } from "@/components/form-message";

export function AccountForm({ user }: { user: any }) {
  const [changePassword, setChangePassword] = useState(false);
  const [isPeding, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof UserAccountSchema>>({
    resolver: zodResolver(UserAccountSchema),
    defaultValues: {
      // name: user?.name || undefined,
      // email: user?.email || undefined,
      // oldPassword: changePassword ? "" : undefined,
      // newPassword: changePassword ? "" : undefined,
      // confirmNewPassword: changePassword ? "" : undefined,
      name: user?.name || "",
      email: user?.email || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      // name: user?.name || undefined,
      // email: user?.email || undefined,
      // oldPassword: undefined,
      // newPassword: undefined,
      // confirmNewPassword: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof UserAccountSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      editMe(user.id, values)
        .then((data) => {
          if (data?.success) {
            setSuccess(data.success);
          }
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch(() => {
          setError("something went wrong");
        });
    });
  };

  return (
    <div className="max-w-lg mx-auto ">
      <FormError message={error} />
      <FormSuccess message={success} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isPeding} {...field} placeholder="name" />
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
                  <Input disabled={isPeding} {...field} placeholder="email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPeding}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setChangePassword((prev) => !prev)}
          >
            {changePassword ? "Hide Password Form" : "Change Password Form"}
          </Button>
          {changePassword && (
            <>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input disabled={isPeding} {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input disabled={isPeding} {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input disabled={isPeding} {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button disabled={isPeding} type="submit" className="block">
            Save Change
          </Button>
        </form>
      </Form>
    </div>
  );
}
