import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/vercel-text", label: "Vercel text" },
  { href: "/vercel-img-v1", label: "Vercel image v1" },
  { href: "/vercel-img-v2", label: "Vercel image v2" },
  { href: "/appwrite", label: "Appwrite" },
];

export default function CrudMenuPage() {
  return <TitlePage title="Crud" menu={menu} />;
}
