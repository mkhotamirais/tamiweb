import { currentUser } from "@/lib/currentAuth";
import MainMenuClient from "./main-menu-client";

export async function MainMenu() {
  const user = await currentUser();
  return <MainMenuClient user={user} />;
}
