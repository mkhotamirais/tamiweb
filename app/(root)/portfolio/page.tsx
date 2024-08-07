import About from "./_components/about";
import Contact from "./_components/contact";
import Experience from "./_components/experience";
import Hero from "./_components/hero";
import Project from "./_components/project";
import Skill from "./_components/skill";

export default function PortofolioSaya() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Skill />
      <Project />
      <Experience />
      <Contact />
    </div>
  );
}
