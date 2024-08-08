import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/jikan-anime", label: "Jikan Anime" },
  { href: "/teori", label: "" },
];

export default function CrudMenuPage() {
  return <TitlePage title="Crud" menu={menu} />;
}
