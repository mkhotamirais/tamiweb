import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/image-v1", label: "projects" },
  { href: "/teori", label: "portofolio legacy" },
];

export default function CrudMenuPage() {
  return <TitlePage title="Crud" menu={menu} />;
}
