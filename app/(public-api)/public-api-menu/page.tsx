import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/jikan-anime", label: "Jikan Anime" },
  { href: "/dummyjson", label: "Dummyjson" },
  { href: "/tmdb", label: "Tmdb" },
];

export default function CrudMenuPage() {
  return <TitlePage title="Crud" menu={menu} />;
}
