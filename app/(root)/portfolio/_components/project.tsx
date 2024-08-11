"use client";

import { Title } from "./components";
import { projectList } from "./menu";
import ProjectItem from "./project-item";
import React from "react";
import useSectionView from "./useSectionView";
import { Projects } from "../../_components/projects";

export default function Project() {
  const { ref } = useSectionView("project");

  return (
    <section id="project" ref={ref} className="scroll-mt-16 sm:scroll-mt-24 pb-24">
      {/* <Title>My Projects</Title> */}
      {/* <div className="flex flex-col gap-2">
        {projectList.map((item, i) => (
          <ProjectItem key={i} {...item} />
        ))}
      </div> */}
      <Projects />
    </section>
  );
}
