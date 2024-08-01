"use client";

import { addImage } from "@/actions/img-v1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { UploadImageMessage } from "../_components/upload-image-message";
import { useState } from "react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AddUploadImageForm() {
  const [state, action] = useFormState(addImage, null);

  return (
    <div className="border p-3 rounded-lg max-w-sm mt-12 mx-auto">
      <h1 className="text-2xl mb-4">Add Image</h1>
      <form action={action}>
        <AddUploadImageInputs state={state} />
      </form>
    </div>
  );
}

function AddUploadImageInputs({ state }: { state: any }) {
  const { pending } = useFormStatus();
  const [preview, setPreview] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <Input disabled={pending} type="text" id="name" name="name" placeholder="name" />
      <UploadImageMessage id="name-error" message={state?.errors?.name} />
      <Input disabled={pending} type="file" id="image" name="image" onChange={onImageChange} />
      <UploadImageMessage id="image-error" message={state?.errors?.image} />
      {/* preview image */}
      {preview && (
        <Avatar className="w-32 h-32 rounded-sm">
          <AvatarImage src={preview} className="rounded-sm object-contain bg-slate-200" />
          <AvatarFallback className="rounded-sm">Preview</AvatarFallback>
        </Avatar>
      )}
      <UploadImageMessage id="message-error" message={state?.error} />
      <Button disabled={pending} type="submit">
        Submit
      </Button>
    </>
  );
}
