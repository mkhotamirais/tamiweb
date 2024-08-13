"use client";

import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import { usePortfolio } from "./usePortfolio";

export const menu = [
  { hash: "#home", label: "home" },
  { hash: "#about", label: "about" },
  { hash: "#project", label: "project" },
  { hash: "#skill", label: "skill" },
  { hash: "#experience", label: "experience" },
  { hash: "#contact", label: "contact" },
] as const;

export default function Header({ className }: { className?: string }) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${className} h-16 z-40 fixed top-0 w-full`}
    >
      <BubbleNav className="block sm:hidden" />
      <FloatNav className="hidden sm:flex" />
      <BubbleNavBtn />
    </motion.header>
  );
}

function NavContent({ className }: { className?: string }) {
  const { activeSection, setActiveSection, setTimeLastClick } = usePortfolio();
  return menu.map((item, i) => (
    <Link
      onClick={() => {
        setActiveSection(item.label);
        setTimeLastClick(Date.now());
      }}
      href={item.hash}
      key={i}
      className={`${className} ${
        activeSection === item.label ? "text-gray-500 dark:text-slate-400" : "text-gray-950 dark:text-white"
      } relative p-2 text-center capitalize text-sm hover:text-gray-500 dark:hover:text-slate-500`}
    >
      {item.label}
      {item.label === activeSection && (
        <motion.div
          layoutId="activeSection"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute -z-10 bg-gray-100 dark:bg-slate-700 inset-0 rounded-full"
        />
      )}
    </Link>
  ));
}

function FloatNav({ className }: { className: string }) {
  return (
    <nav
      className={`${className} border dark:border-gray-600 shadow-lg absolute left-1/2 -translate-x-1/2 p-1 top-1/2 -translate-y-1/2 rounded-full gap-1 bg-white/70 dark:bg-black/40 backdrop-blur`}
    >
      <NavContent className="rounded-full px-4" />
    </nav>
  );
}

function BubbleNavBtn() {
  const { nav, toggleNav } = usePortfolio();
  return (
    <motion.button
      onClick={toggleNav}
      type="button"
      className="flex sm:hidden absolute right-3 top-3 border size-12 rounded-full items-center justify-center"
    >
      <motion.div
        animate={{ rotate: nav ? "180deg" : 0 }}
        whileTap={{ scale: 0.8 }}
        className="border size-10 flex items-center justify-center rounded-full text-xl bg-white/50 backdrop-blur"
      >
        {nav ? <FaXmark /> : <FaBars />}
      </motion.div>
    </motion.button>
  );
}

function BubbleNav({ className }: { className: string }) {
  const { nav } = usePortfolio();
  return (
    <motion.nav
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: nav ? 1 : 0, opacity: 1 }}
      className={`origin-top-right flex gap-1 justify-center items-center bg-white/80 dark:bg-black/50 backdrop-blur rounded-2xl p-3 px-5 sm:hidden absolute right-3 mr-10 top-full flex-col`}
    >
      <NavContent className="rounded-full w-fit bg-gray-50 dark:bg-gray-800" />
    </motion.nav>
  );
}
