import React from "react";
import { getTextById } from "@/actions/vercel-text";
import { UpdateForm } from "../../_components/update-form";

export default async function UpdateTextPage({ params: { textId } }: { params: { textId: string } }) {
  const text = await getTextById(textId);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Update Text</h1>
      <UpdateForm text={text} />
    </div>
  );
}
