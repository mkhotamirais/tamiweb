"use client";

import ProjectItem from "./project-item";
import React from "react";
import useSectionView from "./useSectionView";
import { Projects } from "../../_components/projects";

export default function Project() {
  const { ref } = useSectionView("project");

  return (
    <section id="project" ref={ref} className="scroll-mt-16">
      {/* <Title>My Projects</Title> */}
      {/* <div className="flex flex-col gap-2">
        {projectList.map((item, i) => (
          <ProjectItem key={i} {...item} />
        ))}
      </div> */}
      <Projects className="" />
    </section>
  );
}
