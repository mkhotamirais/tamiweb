"use client";

import { Title } from "./components";
import { skillList } from "./menu";
import { motion } from "framer-motion";
import useSectionView from "./useSectionView";

export default function Skill() {
  const { ref } = useSectionView("skill");

  return (
    <section id="skill" ref={ref} className="max-w-3xl mx-auto scroll-mt-16 sm:scroll-mt-24 mb-24">
      <Title>My Skills</Title>
      <div className="flex gap-2 flex-wrap justify-center">
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
            className="bg-white dark:bg-gray-950 dark:border-gray-600 border rounded-xl p-4 gap-2 flex flex-col justify-center items-center shadow"
          >
            <div className="text-2xl">
              <item.icon />
            </div>
            <div className="font-raleway">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
