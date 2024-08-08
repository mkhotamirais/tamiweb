"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages];
  if (currentPage >= totalPages - 2) return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export default function TeoriPaginasi({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);
  type Pos = "first" | "last" | "middle" | "single" | undefined;
  type PagNumParam = { page: number | string; href: string; pos: Pos; isActive: boolean };
  const PagNum = ({ href, isActive, page, pos }: PagNumParam) => {
    const className = cn("flex h-full w-full items-center justify-center text-sm border min-w-6 w-max", {
      "rounded-l-sm": pos === "first" || pos === "single",
      "rounded-r-sm": pos === "last" || pos === "single",
      "z-10 bg-blue-100 border-blue-500": isActive,
      "hover:bg-gray-100": !isActive && pos !== "middle",
      "text-gray-300 pointer-events-none": pos === "middle",
    });
    return isActive && pos === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  };

  const PagArrow = ({ href, dir, isDisabled }: { href: string; dir: "left" | "right"; isDisabled?: boolean }) => {
    const className = cn("flex h-full w-full items-center justify-center text-sm border", {
      "pinter-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2": dir === "left",
      "ml-2": dir === "right",
    });
    const icon = dir === "left" ? <HiChevronLeft size={20} /> : <HiChevronRight size={20} />;
    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link href={href} className={className}>
        {icon}
      </Link>
    );
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex p-2 my-1 w-fit">
      <PagArrow dir="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />
      <div className="flex">
        {allPages.map((page, index) => {
          let pos: Pos;
          if (index === 0) pos = "first";
          if (index === allPages.length - 1) pos = "last";
          if (allPages.length === 1) pos = "single";
          if (page === "...") pos = "middle";

          return (
            <PagNum key={index} href={createPageURL(page)} page={page} pos={pos} isActive={currentPage === page} />
          );
        })}
      </div>
      <PagArrow dir="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
    </div>
  );
}
