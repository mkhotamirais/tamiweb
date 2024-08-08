"use client";

import { Toaster } from "react-hot-toast";
import About from "./_components/about";
import Contact from "./_components/contact";
import Experience from "./_components/experience";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import Project from "./_components/project";
import Skill from "./_components/skill";
import { usePortfolio } from "./_components/usePortfolio";

export default function PortofolioSaya() {
  const { nav, hideNav } = usePortfolio();
  const handleClick = () => {
    if (nav) hideNav();
  };

  return (
    <div className="font-merriweather min-h-screen flex flex-col justify-between">
      <Toaster />
      <Header />
      <main onClick={handleClick} className="flex-grow">
        <Hero />
        <About />
        <Skill />
        <Project />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
