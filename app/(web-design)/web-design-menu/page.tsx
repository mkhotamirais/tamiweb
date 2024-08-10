import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/web-design-menu", label: "Web Design" },
  // { href: "", label: "" },
];

export default function HomeMenuPage() {
  return <TitlePage title="Home" menu={menu} />;
}
