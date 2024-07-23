"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchContact({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    term ? params.set("query", term) : params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        defaultValue={searchParams.get("query")?.toString()}
        type="text"
        className={`${className} w-full border p-2`}
        placeholder="Search.."
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
