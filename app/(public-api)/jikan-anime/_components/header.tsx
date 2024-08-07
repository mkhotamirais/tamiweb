import Link from "next/link";
import { SearchTrigger } from "./search-trigger";
import { Search } from "./search";

export const Header = () => {
  return (
    <header className="z-50 h-16 bg-jikan-primary border-b-[5px] border-jikan-secondary px-3 sticky top-0">
      <nav className="flex h-full items-center justify-between">
        <Link href="/jikan-anime" scroll className="text-2xl font-bold text-jikan-accent ">
          Jikan<span className="text-jikan-accent">Anime</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Search />
          <SearchTrigger />
        </div>
      </nav>
    </header>
  );
};
