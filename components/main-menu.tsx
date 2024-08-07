"use client";

import { useMm } from "@/hooks/useMm";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";
import { MainMenuLinks } from "./main-menu-links";

export function MainMenu({ user }: { user: any }) {
  const { mm } = useMm();

  return (
    <div
      className={`${
        mm ? "translate-y-0 bottom-0" : "translate-y-full bottom-1"
      } z-50 fixed inset-x-1 sm:inset-x-32 bg-none transition`}
    >
      <TriggerMmSmUp />
      <TriggerMmSmDown />
      <div className="p-1">
        <MainMenuLinks user={user} />
      </div>
    </div>
  );
}

const TriggerMmSmUp = () => {
  const { mm, closeMm, openMm } = useMm();
  const onMouseEnter = () => {
    mm ? closeMm() : openMm();
  };
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="absolute -translate-y-full hidden sm:flex items-center justify-center w-full"
    >
      <Button
        size="icon"
        variant={mm ? "secondary" : "ghost"}
        className={`${mm ? "rotate-180" : ""} transition rounded-full`}
      >
        <ChevronUp className="size-4" />
      </Button>
    </div>
  );
};

const TriggerMmSmDown = () => {
  const { mm, closeMm, openMm } = useMm();
  const onClick = () => {
    mm ? closeMm() : openMm();
  };
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant={mm ? "secondary" : "ghost"}
      className={`absolute flex sm:hidden left-1/2 -translate-x-1/2 -translate-y-full ${
        mm ? "rotate-180" : ""
      } transition rounded-full`}
    >
      <ChevronUp className="w-4 h-4" />
    </Button>
  );
};
