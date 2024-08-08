"use client";

import Link from "next/link";
import { FaBars, FaMagnifyingGlass, FaSchool, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSchool } from "./use-school";

export const menu = [
  { href: "/school", label: "home" },
  { href: "/school/about-us", label: "about us" },
  { href: "/school/admissions", label: "admissions" },
  { href: "/school/academics", label: "academics" },
  { href: "/school/student-life", label: "student life" },
  { href: "/school/parent-resources", label: "parent resources" },
  { href: "/school/news-and-events", label: "news & events" },
  { href: "/school/career-opportunities", label: "career" },
];

export default function Header() {
  const pathname = usePathname();
  const { nav, hideNav } = useSchool();
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const handleLogo = () => {
    setActive(null);
    if (nav) hideNav();
  };

  const handleNavLink = (index: number) => {
    setActive(index);
    if (nav) hideNav();
  };

  return (
    <header className="z-50 h-16 sticky shadow-md top-0 bg-white dark:bg-gray-950">
      <div className="h-full flex px-3 max-w-6xl mx-auto justify-between gap-2 items-center">
        <Link href="/web-design/school/school-1" onClick={handleLogo} className="text-3xl text-blue-500">
          <FaSchool />
        </Link>
        <div
          className={`${
            nav ? "scale-x-100" : "scale-x-0"
          } origin-right lg:scale-x-100 fixed top-0 bottom-0 right-0 w-2/3 lg:w-auto p-3 lg:p-0 bg-blue-500/50 backdrop-blur border-l lg:border-none lg:backdrop-blur-0 lg:bg-white dark:lg:bg-gray-950 lg:static h-screen lg:h-auto transition-all ease-in-out`}
        >
          <div className="flex gap-1 flex-col items-start lg:items-center lg:flex-row">
            <button
              onClick={hideNav}
              type="button"
              aria-label="close nav"
              className="p-2 text-xl flex lg:hidden self-end text-blue-700"
            >
              <FaXmark />
            </button>
            {menu.map((item, index) => (
              <motion.div
                layout
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                key={index}
                className="relative w-full"
              >
                <Link
                  onClick={() => handleNavLink(index)}
                  href={item.href}
                  replace
                  className={`${
                    pathname.split("/")[2] === item.href.split("/")[2]
                      ? "lg:bg-blue-400 text-white"
                      : "bg-transparent text-white lg:text-gray-800 dark:lg:text-gray-300"
                  } text-white block relative z-10 text-sm capitalize h-full py-2 px-2 min-w-max rounded-lg`}
                >
                  {item.label}
                </Link>
                <motion.div
                  className={`absolute z-0 left-0 bottom-0 w-full ${
                    hovered === index ? "min-h-full" : "min-h-0"
                  } bg-blue-400 transition-all rounded-lg`}
                />
                {active === index && (
                  <motion.div
                    layoutId="active"
                    className="absolute z-0 left-0 bottom-0 w-full h-full top-0 bg-blue-500 rounded-lg"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <NavSearch />
        <NavBtn />
      </div>
    </header>
  );
}

export function NavBtn() {
  const { toggleNav } = useSchool();
  return (
    <button
      onClick={toggleNav}
      type="button"
      className="border p-2 text-xl block lg:hidden text-blue-500 rounded-lg hover:text-white hover:bg-blue-500"
      aria-label="nav-button"
    >
      <FaBars />
    </button>
  );
}

export function NavSearch({ className }: { className?: string }) {
  return (
    <div className={`${className} flex max-w-full lg:max-w-48 text-sm rounded-full overflow-hidden border`}>
      <input type="search" className="w-full focus:outline-none mx-3 bg-inherit" placeholder="Search here.." />
      <button
        type="button"
        aria-label="button"
        className="p-3 text-blue-500 border-l hover:bg-blue-500 hover:text-white"
      >
        <FaMagnifyingGlass />
      </button>
    </div>
  );
}
