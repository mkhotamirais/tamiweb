"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { projectList } from "./menu";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectItem({ title, href, description, imageUrl, tags }: (typeof projectList)[number]) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "0.9 1"] });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div ref={ref} style={{ scale: scaleProgress, opacity: opacityProgress }} className="relative">
      <a
        href={href}
        className="relative p-4 min-h-[40vh] shadow-lg bg-white dark:bg-gray-950 dark:border-gray-600 border rounded-lg flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 order-2 sm:order-1 flex flex-col">
          <div>
            <h3 className="font-raleway text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
          <div className="text-xs flex flex-grow items-center py-3">
            <div className="flex gap-1 flex-wrap">
              {tags.map((item) => (
                <div key={item} className="bg-gray-500 text-white p-1 px-2 rounded-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 order-1 sm:order-2">
          <Image src={imageUrl} alt={title} quality={80} className="object-cover object-center size-full rounded-xl" />
        </div>
      </a>
    </motion.div>
  );
}
