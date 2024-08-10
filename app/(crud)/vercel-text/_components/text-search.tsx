"use client";

import { Input } from "@/components/ui/input";
import { Text } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function TextSearch({ texts }: { texts: Text[] | null }) {
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
      disabled={texts?.length === 0}
      type="text"
      defaultValue={searchParams.get("q")?.toString()}
      placeholder="Search.."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
