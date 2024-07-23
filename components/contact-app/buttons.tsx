"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { deleteContact } from "@/actions/contact-app";
import { FaTrash } from "react-icons/fa6";

export const SubmitContactForm = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      title={label === "save" ? "add" : "update"}
      className={clsx("border p-2 rounded w-32", { "opacity-50": pending })}
    >
      {label === "save" ? (
        <span>{pending ? "saving..." : "save"}</span>
      ) : (
        <span>{pending ? "updating..." : "update"}</span>
      )}
    </Button>
  );
};

export const DeleteContactBtn = ({ id }: { id: string }) => {
  const DeleteContactWithId = deleteContact.bind(null, id);

  return (
    <form action={DeleteContactWithId}>
      <Button variant="destructive" size="sm">
        <FaTrash />
      </Button>
    </form>
  );
};
