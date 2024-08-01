"use client";

import { Input } from "@/components/ui/input";
import { useProducStore } from "@/hooks/useProduct";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchProduct({ user }: { user: any }) {
  const { errorMsg, successMsg, setErrorMsg, setSuccessMsg } = useProducStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((e: string) => {
    if (errorMsg) setErrorMsg("");
    if (successMsg) setSuccessMsg("");
    const params = new URLSearchParams(searchParams);
    e ? params.set("q", e) : params.delete("q");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        title="Login dahulu untuk menggunakan fitur search"
        disabled={!user}
        defaultValue={searchParams.get("q")?.toString()}
        placeholder="Search here.."
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
