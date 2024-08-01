"use client";

import Link from "next/link";
import { menu } from "@/lib/menu";
import { AuthButton } from "./auth/auth-button";
import { useMmStore } from "@/hooks/useMmStore";
import { MainMenuTriggerSmDown, MainMenuTriggerSmUp } from "./main-menu-trigger";

export default function MainMenuClient({ user }: { user: any }) {
  const { mm, hideMm } = useMmStore();
  const onClick = () => {
    if (mm) hideMm();
  };
  return (
    <div
      className={`${
        // mm ? "translate-y-0 bottom-1" : "translate-y-full bottom-0"
        mm ? "translate-y-0" : "translate-y-full"
      } bg-cyan-700/50 z-50 bottom-0 fixed inset-x-1 md:inset-x-24 rounded-xl transition-all`}
    >
      <MainMenuTriggerSmDown />
      <MainMenuTriggerSmUp />
      <div className="flex flex-col">
        <nav className="bg-white border m-1 rounded-lg p-1 px-2 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Tamiweb
          </Link>
          <AuthButton user={user} />
        </nav>

        <div className="bg-white border flex-grow m-1 mt-0 rounded-lg max-h-[50vh] py-4 px-2">
          <div>
            <h3 className="text-xl font-medium mb-3">Public Api</h3>
            <div className="flex flex-col capitalize gap-2 justify-start">
              {menu.map((item, i) => (
                <Link onClick={onClick} key={i} href={item.href} className="text-sm hover:underline">
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
