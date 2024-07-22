"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect } from "react";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";

export const Search = () => {
  const { setPage, keyword, setKeyword, searchBox, hideSearchBox } = useJikanAnimeStore();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword) {
      router.push(`/jikan-anime/search/${keyword}`);
    } else {
      router.push(`/jikan-anime`);
    }
    if (searchBox) hideSearchBox();
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
    setPage(1);
  };

  const handleFocus = () => {
    if (searchBox && searchRef.current) {
      searchRef.current.select();
    }
  };

  useEffect(() => {
    if (searchBox && searchRef?.current) {
      searchRef.current.focus();
    } else if (!searchBox && searchRef?.current) {
      searchRef.current.blur();
    }
  }, [searchBox]);

  return (
    <form
      onSubmit={onSubmit}
      className={`${
        searchBox ? "scale-y-100" : "scale-y-0"
      } origin-top sm:scale-y-100 mx-3 fixed sm:static z-50 top-16 left-0 right-0 sm:bg-inherit sm:w-72 transition-all`}
    >
      <div className="flex mt-1 sm:mt-0 rounded-xl overflow-hidden bg-jikan-primary sm:bg-jikan-secondary">
        <input
          ref={searchRef}
          type="search"
          className="bg-inherit w-full p-2 focus:outline-none"
          value={keyword}
          placeholder="Search here.."
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={handleFocus}
        />
        <button
          ref={buttonRef}
          typeof="button"
          title="search"
          type="submit"
          className="bg-jikan-accent w-12 flex items-center justify-center hover:opacity-80"
        >
          <FaMagnifyingGlass />
        </button>
      </div>
    </form>
  );
};
