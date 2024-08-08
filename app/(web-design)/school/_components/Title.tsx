import Image from "next/image";

export default function Title({ title }: { title: string }) {
  return (
    <div className="relative h-32 sm:h-48 flex items-center justify-center">
      <div className="absolute z-20 bg-black/50 inset-0" />
      <Image
        src="/school-1/uns-hero-image.jpg"
        width={1000}
        height={700}
        alt="school building"
        className="absolute z-10 w-full h-full object-cover object-center"
        priority
      />
      <h1 className="capitalize relative z-30 font-merriweather text-4xl text-transparent font-bold bg-gradient-to-t from-white to-blue-500 bg-clip-text">
        {title}
      </h1>
    </div>
  );
}
