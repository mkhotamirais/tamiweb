import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="px-3 max-w-2xl mx-auto flex flex-col gap-5 items-center justify-center min-h-screen">
      <h1 className="text-3xl text-center">Selamat datang di website saya</h1>
      <div className="flex gap-2">
        <Button variant="outline">halo</Button>
        <Button>explore</Button>
        <button>hello</button>
      </div>
    </div>
  );
}
