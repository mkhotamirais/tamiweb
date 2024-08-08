import { TitlePage } from "@/components/wrapper";

const menu = [
  { href: "/form", label: "form" },
  { href: "/", label: "" },
];

export default function ComponentsMenuPage() {
  return <TitlePage title="Components" menu={menu} />;
}
