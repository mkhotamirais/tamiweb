import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/currentAuth";
import { WelcomeButtons } from "./_components/welcome-buttons";
import { Projects } from "./_components/projects";

const font = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
});

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="relative">
      <div className="px-3 flex flex-col gap-5 items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100 to-cyan-500">
        <div className="text-center mb-6">
          <h1 className={cn("text-4xl text-center font-bold mb-5 drop-shadow-md", font.className)}>
            Welcome <span className="capitalize">{user?.name}</span>
          </h1>
          <p className="text-xl font-raleway text-center max-w-lg md:max-w-xl mx-auto">
            I&apos;m <b>Mkhotami</b>, a <b>web developer</b> with expertise in <b>MERN</b> and <b>NextJs</b>. I build
            dynamic, <b>responsive web applications</b> and create seamless user experiences with efficient code.
          </p>
        </div>
        <WelcomeButtons />
      </div>
      <Projects />
    </div>
  );
}
