import React from "react";
import { UpdateTeoriForm } from "../../_components/update-teori-form";
import { getTeoriById } from "@/actions/teori";

export default async function UpdateTeoriPage({ params: { teoriId } }: { params: { teoriId: string } }) {
  const teori = await getTeoriById(teoriId);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Update Theory</h1>
      <UpdateTeoriForm teori={teori} />
    </div>
  );
}
