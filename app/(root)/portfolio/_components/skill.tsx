"use client";

import { motion } from "framer-motion";
import useSectionView from "./useSectionView";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiNextdotjs,
  SiMysql,
  SiGit,
  SiGithub,
  SiRedux,
  SiVite,
  SiPrisma,
  SiShadcnui,
  SiMongoose,
  SiVercel,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { Title } from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const skillList = [
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "NextJs" },
  { icon: SiTypescript, label: "Typescript" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiShadcnui, label: "Shadcn" },
  { icon: SiHtml5, label: "HTML" },
  { icon: SiCss3, label: "CSS" },
  { icon: SiJavascript, label: "Javascript" },
  { icon: SiBootstrap, label: "Bootstrap" },
  { icon: SiMongodb, label: "Mongodb" },
  { icon: SiExpress, label: "Express" },
  { icon: SiNodedotjs, label: "NodeJs" },
  { icon: TbBrandFramerMotion, label: "Framer Motion" },
  { icon: SiRedux, label: "Redux" },
  { icon: SiMysql, label: "Mysql" },
  { icon: SiGit, label: "Git" },
  { icon: SiGithub, label: "Github" },
  { icon: SiVite, label: "Vite" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiMongoose, label: "Mongoose" },
  { icon: SiVercel, label: "Vercel" },
] as const;

export default function Skill() {
  const { ref } = useSectionView("skill");

  return (
    <section id="skill" ref={ref} className="max-w-2xl mx-auto scroll-mt-16">
      <Title>My Skills</Title>
      <div className="flex gap-3 flex-wrap justify-center px-3">
        {skillList.map((item, i) => (
          <motion.div
            key={i}
            variants={{
              initial: { opacity: 0, y: 100 },
              animate: { opacity: 1, y: 0, transition: { delay: 0.05 * i } },
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="rounded-xl p-4 bg-cyan-500/15">
              <Link href="/projects" className="flex flex-col justify-center items-center shadow  gap-2 h-fit">
                <div className="text-2xl">
                  <item.icon />
                </div>
                <div className="font-raleway">{item.label}</div>
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
