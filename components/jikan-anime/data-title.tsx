import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export const DataTitle = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  return (
    <div className="flex justify-between items-center mb-3 mt-5 bg-jikan-primary rounded-xl p-3 px-4 border-b border-b-jikan-accent">
      <div>
        <h1 className="text-xl font-bold">{children}</h1>
        {/* <div className="h-1 rounded-full mt-2 bg-jikan-accent w-12" /> */}
      </div>
      {href && (
        <Link href={href} className="text-jikan-accent flex items-center gap-2 min-w-max">
          See all
          <FaArrowRight />
        </Link>
      )}
    </div>
  );
};
