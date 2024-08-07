import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/currentAuth";
import { MeButtons } from "./_components/me-buttons";
import { WelcomeButtons } from "./_components/welcome-buttons";

const font = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
});

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="px-3 flex flex-col gap-5 items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100 to-cyan-500">
      <MeButtons />
      <div className="text-center mb-6">
        <h1 className={cn("text-4xl text-center font-bold mb-5 drop-shadow-md", font.className)}>
          Welcome <span className="capitalize">{user?.name}</span>
        </h1>
        <p className="text-xl font-medium text-muted-foreground">
          I am <span className="text-black">Khotemi</span>, I am a web developer, my focus is{" "}
          <span className="text-black">mern / nextjs</span>
        </p>
      </div>
      <WelcomeButtons />
    </div>
  );
}
