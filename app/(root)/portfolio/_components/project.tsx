"use client";

import { Title } from "./components";
import { projectList } from "./menu";
import ProjectItem from "./project-item";
import React from "react";
import useSectionView from "./useSectionView";

export default function Project() {
  const { ref } = useSectionView("project");

  return (
    <section id="project" ref={ref} className="scroll-mt-16 sm:scroll-mt-24 max-w-2xl mx-auto px-3 mb-24">
      <Title>My Projects</Title>
      <div className="flex flex-col gap-2">
        {projectList.map((item, i) => (
          <ProjectItem key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
