import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/layout-vs-template", label: "Layout vs Template" },
];

export default function HomeMenuPage() {
  return <TitlePage title="Home" menu={menu} />;
}
