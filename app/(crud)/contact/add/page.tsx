"use client";

import { addContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { FormError, FormSuccess } from "@/components/form-message";

function AddContactForm({ state }: { state: any }) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <Label>Name</Label>
        <Input disabled={pending} id="name" name="name" placeholder="name" />
        {state?.errors?.name && <FormError id="name-error" message={state?.errors?.name} />}
      </div>
      <div>
        <Label>Phone</Label>
        <Input disabled={pending} id="phone" name="phone" placeholder="phone" type="tel" />
        {state?.errors?.phone && <FormError id="phone-error" message={state?.errors?.phone} />}
      </div>
      <div>
        <Label>Image</Label>
        <Input title="image" type="file" id="image" name="image" className="p-2 border w-full rounded-lg mb-2" />
        {state?.errors?.image && <FormError id="image-error" message={state?.errors?.image} />}
      </div>
      {!state?.error && <FormSuccess id="success" message="berhasil" />}
      <Button disabled={pending} type="submit">
        Save
      </Button>
    </>
  );
}

export default function AddContactPage() {
  const [state, action] = useFormState(addContact, {});

  return (
    <div className="py-8">
      <h1 className="mb-4 text-xl font-medium">Add Contact Form</h1>
      <form action={action} className="space-y-4">
        <AddContactForm state={state} />
      </form>
    </div>
  );
}
