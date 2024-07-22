"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FaChevronUp } from "react-icons/fa6";
import { useMmStore } from "@/hooks/useMmStore";
import { menu } from "@/lib/menu";

export default function MainMenu() {
  const { mm, hideMm, showMm } = useMmStore();
  const onMouseEnter = () => {
    mm ? hideMm() : showMm();
  };
  return (
    <div
      className={`${
        mm ? "bottom-1" : "-bottom-1/2"
      } bg-gray-300 z-50 border-t fixed inset-x-1 rounded-xl transition-all`}
    >
      <Button
        onMouseEnter={onMouseEnter}
        variant={mm ? "default" : "ghost"}
        size="icon"
        className={`${mm ? "rotate-180" : "rotate-0"} absolute left-1/2 -translate-x-1/2 -top-10 rounded-full`}
      >
        <FaChevronUp className="w-3 h-3" />
      </Button>
      <div className="flex flex-col">
        <nav className="bg-white border m-1 rounded-lg p-1 px-2 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Tamiweb
          </Link>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </nav>
        <div className="bg-white border flex-grow m-1 mt-0 rounded-lg h-[40vh] p-1 px-2">
          <div>
            <h3 className="text-xl font-medium">Public Api</h3>
            <div className="flex flex-col capitalize gap-2 justify-start">
              {menu.map((item, i) => (
                <Link key={i} href={item.href} className="text-sm hover:underline">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
