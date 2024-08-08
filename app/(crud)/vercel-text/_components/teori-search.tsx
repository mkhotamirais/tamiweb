"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function TeoriSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onChange = useDebouncedCallback((e: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    e ? params.set("q", e) : params.delete("q");
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <Input
      type="text"
      defaultValue={searchParams.get("q")?.toString()}
      placeholder="Search.."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
