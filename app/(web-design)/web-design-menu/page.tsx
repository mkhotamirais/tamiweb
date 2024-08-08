import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/school", label: "School" },
  { href: "/layout-vs-template", label: "Layout vs Template" },
];

export default function HomeMenuPage() {
  return <TitlePage title="Home" menu={menu} />;
}
