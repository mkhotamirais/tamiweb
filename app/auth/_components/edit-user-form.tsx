"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EditUserSchema } from "@/schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormError, FormSuccess } from "@/components/form-message";
import { editUserById } from "@/actions/adminAction";

export function EditUserForm({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      email: user?.email || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      name: user?.name || "",
      role: user?.role || "",
    },
  });

  const onSubmit = (values: z.infer<typeof EditUserSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      editUserById(user.id, values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isPending || user.email === "tamiweb.01@gmail.com"} {...field} placeholder="name" />
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
                <Input
                  title="Email hanya bisa diedit jika bukan admin utama atau bukan email OAuth"
                  disabled={isPending || user.email === "tamiweb.01@gmail.com" || user.provider !== "credentials"}
                  {...field}
                  placeholder="email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                disabled={isPending || user.email === "tamiweb.01@gmail.com"}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={UserRole.USER}>User</SelectItem>
                </SelectContent>
                <FormMessage />
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <FormLabel>Two Factor Authentication</FormLabel>
              <FormDescription>Enamble two factor authentication for this account</FormDescription>
              <FormControl>
                <Switch
                  title="Two factor hanya bisa diedit jika bukan admin utama atau bukan email OAuth"
                  disabled={isPending || user.email === "tamiweb.01@gmail.com" || user.provider !== "credentials"}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending || user.email === "tamiweb.01@gmail.com"} type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
