import { AnimeList } from "@/lib/jikan-anime-types";
import { create } from "zustand";

type JikanAnimeType = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchBox: boolean;
  showSearchBox: () => void;
  hideSearchBox: () => void;
  page: number;
  setPage: (page: number) => void;
  searchResult: AnimeList | null;
  setSearchResult: (searchResult: AnimeList) => void;
  topAnime: AnimeList | null;
  setTopAnime: (topAnime: AnimeList) => void;
};

export const useJikanAnimeStore = create<JikanAnimeType>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
  searchBox: false,
  showSearchBox: () => set({ searchBox: true }),
  hideSearchBox: () => set({ searchBox: false }),
  page: 1,
  setPage: (page) => set({ page }),
  searchResult: null,
  setSearchResult: (searchResult) => set({ searchResult }),
  topAnime: null,
  setTopAnime: (topAnime) => set({ topAnime }),
  //   boxDash: false,
  //   toggleBoxDash: () => set((state) => ({ boxDash: !state.boxDash })),
}));
