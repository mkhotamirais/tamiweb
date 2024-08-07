"use client";

import { FaGithub, FaLinkedin, FaUser } from "react-icons/fa6";
import { ChevronLeft } from "lucide-react";
import { useMm } from "@/hooks/useMm";
import { SiVite, SiNextdotjs } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MeButtons() {
  const { me, openMe, closeMe } = useMm();
  const onClick = () => {
    me ? closeMe() : openMe();
  };
  return (
    <div
      className={`fixed flex gap-2 top-0 right-0 mt-3 pr-3 sm:pr-8 ${
        me ? "translate-x-0" : "translate-x-full"
      } transition`}
    >
      <Button
        size={"icon"}
        variant={"link"}
        onClick={onClick}
        title="me buttons"
        type="button"
        className={`${
          me ? "rotate-180" : "0"
        } rounded-full transition absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full`}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Button asChild size="icon" className="rounded-full" variant="secondary">
        <Link title="my portfolio" href="/portfolio">
          <FaUser className="size-4" />
        </Link>
      </Button>
      <Button asChild size="icon" className="rounded-full" variant="secondary">
        <a title="linked account" href="https://www.linkedin.com/in/mkhotami-rais/">
          <FaLinkedin className="size-4" />
        </a>
      </Button>
      <Button asChild size="icon" className="rounded-full" variant="secondary">
        <a title="github account" href="https://github.com/mkhotamirais">
          <FaGithub className="size-4" />
        </a>
      </Button>
      <Button asChild size="icon" className="rounded-full" variant="secondary">
        <a title="my web with vite" href="https://tamivite.vercel.app/">
          <SiVite className="size-4" />
        </a>
      </Button>
      <Button asChild size="icon" className="rounded-full" variant="secondary">
        <a title="my web with nextjs" href="https://tamiweb.vercel.app/">
          <SiNextdotjs className="size-4" />
        </a>
      </Button>
    </div>
  );
}
