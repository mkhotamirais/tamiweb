"use client";

import React from "react";
import useSectionView from "./useSectionView";
import { Projects } from "../../_components/projects";

export default function Project() {
  const { ref } = useSectionView("project");

  return (
    <section id="project" ref={ref} className="scroll-mt-16">
      <Projects className="" />
    </section>
  );
}
