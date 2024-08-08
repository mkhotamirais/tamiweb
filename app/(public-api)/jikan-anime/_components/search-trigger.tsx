"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useJikan } from "./use-jikan";

export const SearchTrigger = () => {
  const { searchBox, showSearchBox, hideSearchBox } = useJikan();
  const onClick = () => {
    searchBox ? hideSearchBox() : showSearchBox();
  };

  return (
    <button
      type="button"
      title="show search box"
      onClick={onClick}
      className="block sm:hidden text-jikan-accent text-xl"
    >
      <FaMagnifyingGlass />
    </button>
  );
};
