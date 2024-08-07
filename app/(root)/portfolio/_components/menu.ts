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
} from "react-icons/si";

import { TbBrandFramerMotion } from "react-icons/tb";
import todoImg from "@/public/portfolio/todo.png";
import publicApiImg from "@/public/portfolio/publicapi.png";
import mernKhotamiImg from "@/public/portfolio/mern-khotami.png";
// import hadinalmusriImg from "@/public/portfolio/hadinalmusri.png";
import React from "react";
import { LuGraduationCap } from "react-icons/lu";

export const menu = [
  { hash: "#home", label: "home" },
  { hash: "#about", label: "about" },
  { hash: "#skill", label: "skill" },
  { hash: "#project", label: "project" },
  { hash: "#experience", label: "experience" },
  { hash: "#contact", label: "contact" },
] as const;

export const skillList = [
  { icon: SiHtml5, label: "HTML" },
  { icon: SiCss3, label: "CSS" },
  { icon: SiJavascript, label: "Javascript" },
  { icon: SiTypescript, label: "Typescript" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiBootstrap, label: "Bootstrap" },
  { icon: SiReact, label: "React" },
  { icon: SiMongodb, label: "Mongodb" },
  { icon: SiExpress, label: "Express" },
  { icon: SiNodedotjs, label: "NodeJs" },
  { icon: SiNextdotjs, label: "NextJs" },
  { icon: TbBrandFramerMotion, label: "Framer Motion" },
  { icon: SiRedux, label: "Redux" },
  { icon: SiMysql, label: "Mysql" },
  { icon: SiGit, label: "Git" },
  { icon: SiGithub, label: "Github" },
  { icon: SiVite, label: "Vite" },
] as const;

export const projectList = [
  {
    title: "Todo",
    href: "https://landing-khotami.vercel.app/todo",
    description:
      "4 simple todo apps with the same CRUD functionality but using different tools, with storage saved locally.",
    tags: ["React", "Redux", "Zustand", "Tailwind"],
    imageUrl: todoImg,
  },
  {
    title: "Public Api",
    href: "https://landing-khotami.vercel.app/omdbapi",
    description:
      "Displaying data in the form of tables and card grid systems, with detailed information for each data entry, along with search, sorting, and filtering features",
    tags: ["React", "Zustand", "Tailwind", "Framer Motion", "Omdbapi"],
    imageUrl: publicApiImg,
  },
  {
    title: "Mern App",
    href: "https://mern-khotami.vercel.app/",
    description:
      "Displaying data stored in a MongoDB database, with authentication and authorization to restrict data management access, along with search, sorting, and filtering features.",
    tags: ["React", "Redux", "Mongodb", "Express", "Tailwind", "Framer Motion"],
    imageUrl: mernKhotamiImg,
  },
  // {
  //   title: "Hadinalmusri School",
  //   description:
  //     "I am collaborating with Hadinalmusri School in developing a website that provides school-related information, including profiles, editorial team, advertising information, contacts, and career opportunities",
  //   tags: ["React", "Redux", "Tailwind", "Framer Motion"],
  //   imageUrl: hadinalmusriImg,
  // },
] as const;

export const experienceList = [
  {
    title: "Eduwork Bootcamp",
    location: "Yogyakarta",
    description:
      "I graduated after 5 months of studying in a React and Node.js class, covering topics from basic web programming to project development, including building an online store using various React libraries.",
    icon: React.createElement(LuGraduationCap),
    date: "2023-2024",
  },
];
