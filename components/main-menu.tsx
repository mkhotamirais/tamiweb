"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FaChevronUp } from "react-icons/fa6";
import { useMmStore } from "@/hooks/useMmStore";
import { menu } from "@/lib/menu";

export default function MainMenu() {
  const { mm, hideMm, showMm } = useMmStore();
  const onMouseEnter = () => {
    if (!mm) showMm();
  };

  return (
    <div
      className={`${
        mm ? "translate-y-0 bottom-1" : "translate-y-full bottom-0"
      } bg-indigo-500/50 z-50 fixed inset-x-1 rounded-xl transition-all`}
    >
      <div onMouseEnter={onMouseEnter} className={`w-full fixed mx-auto -top-10 flex justify-center`}>
        <Button
          variant={mm ? "default" : "ghost"}
          size="icon"
          className={`${mm ? "rotate-180" : "rotate-0"} rounded-full`}
        >
          <FaChevronUp className="w-3 h-3" />
        </Button>
      </div>
      <div className="flex flex-col">
        <nav className="bg-white border m-1 rounded-lg p-1 px-2 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Tamiweb
          </Link>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </nav>
        <div className="bg-white border flex-grow m-1 mt-0 rounded-lg max-h-[50vh] py-4 px-2">
          <div>
            <h3 className="text-xl font-medium mb-3">Public Api</h3>
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
