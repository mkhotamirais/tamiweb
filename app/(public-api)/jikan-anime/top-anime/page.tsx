"use client";

import { fetchData } from "@/actions/jikan-anime";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";
import { useEffect } from "react";
import { Pagination } from "../_components/pagination";
import { DataList } from "../_components/data-list";
import { LoaderJikan } from "../_components/loader-jikan";

export default function TopAnimeServer() {
  const { page, setPage, topAnime, setTopAnime } = useJikanAnimeStore();

  const total = topAnime?.pagination?.items?.total;
  const last_visible_page = topAnime?.pagination?.last_visible_page;

  useEffect(() => {
    const getAnime = async () => {
      const data = await fetchData("top/anime", `page=${page}`);
      setTopAnime(data);
    };
    getAnime();
  }, [page, setTopAnime]);

  return (
    <div>
      <h1 className="text-4xl font-bold mt-4 mb-2">Top Anime</h1>
      {topAnime?.data ? (
        <>
          <Pagination total={Number(total)} lastPage={Number(last_visible_page)} />
          <DataList data={topAnime?.data} />
          <Pagination total={Number(total)} lastPage={Number(last_visible_page)} />
        </>
      ) : (
        <LoaderJikan />
      )}
    </div>
  );
}
