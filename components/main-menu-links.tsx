"use client";

import { AppWindow, Code, Component, Database, Edit, Home, House, Image, Presentation } from "lucide-react";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiHtml5, SiReact, SiShadcnui } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useMm } from "@/hooks/useMm";
import Link from "next/link";
import { AuthButton } from "./auth/auth-button";

const menu = [
  {
    heading: "Home",
    icon: Home,
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/portofolio-legacy", label: "Portofolio Legacy" },
    ],
  },
  {
    heading: "Components",
    icon: Component,
    links: [{ href: "/form", label: "Form" }],
  },
  {
    heading: "Crud",
    icon: Edit,
    links: [
      { href: "/img-v1", label: "Image V1" },
      { href: "/teori", label: "teori" },
    ],
  },
  {
    heading: "Public Api",
    icon: TbApi,
    links: [{ href: "/jikan-anime", label: "Jikan Anime" }],
  },
];

export function MainMenuLinks({ user }: { user: any }) {
  const { closeMm } = useMm();
  return (
    <Command>
      <div className="flex items-center justify-between p-3 gap-3 shadow">
        <Link href="/" onClick={closeMm} className="flex items-center gap-2">
          <House className="size-5" /> <div className="font-bold hidden sm:block">Tamivite</div>
        </Link>
        <div className="flex gap-3">
          <CommandInput className="w-28" placeholder="Search menu.." />
          <AuthButton user={user} />
        </div>
      </div>
      <CommandList className="h-[40vh]">
        <CommandEmpty>No results found.</CommandEmpty>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {menu.map((item, key) => (
            <CommandGroup
              key={key}
              heading={
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <div>{item.heading}</div>
                </div>
              }
            >
              {item.links.map((itm, i) => (
                <CommandItem key={i} asChild className="cursor-pointer">
                  <Link href={itm.href} onClick={closeMm}>
                    {itm.label}
                  </Link>
                </CommandItem>
              ))}
              <CommandSeparator />
            </CommandGroup>
          ))}
        </div>
      </CommandList>
    </Command>
  );
}
