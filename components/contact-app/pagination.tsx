"use client";

import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/helper";
import { cn } from "@/lib/utils";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  type Position = "first" | "last" | "middle" | "single" | undefined;
  type PaginationNumberParam = { page: number | string; href: string; position: Position; isActive: boolean };
  const PaginationNumber = ({ page, href, position, isActive }: PaginationNumberParam) => {
    const className = cn("flex h-full w-full items-center justify-center text-sm border min-w-5 w-max", {
      "rounded-l-sm": position === "first" || position === "single",
      "rounded-r-sm": position === "last" || position === "single",
      "z-10 bg-blue-100 border-blue-500": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300 pointer-events-none": position === "middle",
    });
    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  };

  type PaginationArrowParam = { href: string; direction: "left" | "right"; isDisabled?: boolean };
  const PaginationArrow = ({ href, direction, isDisabled }: PaginationArrowParam) => {
    const className = cn("flex h-full w-full items-center justify-center text-sm border", {
      "pinter-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2": direction === "left",
      "ml-2": direction === "right",
    });
    const icon = direction === "left" ? <HiChevronLeft size={20} /> : <HiChevronRight size={20} />;
    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link href={href} className={className}>
        {icon}
      </Link>
    );
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="inline-flex my-3">
      <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />
      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "middle" | "single" | undefined;
          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";
          return (
            <PaginationNumber
              key={index}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>
      <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
    </div>
  );
}
