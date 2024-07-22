"use client";

import { fetchData } from "@/actions/jikan-anime";
import { DataList } from "@/components/jikan-anime/data-list";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";
import { useEffect } from "react";
import { LoaderPulse } from "@/components/jikan-anime/loader-pulse";
import { Pagination } from "@/components/jikan-anime/pagination";

export default function TopAnimeServer() {
  const { page, setPage, topAnime, setTopAnime } = useJikanAnimeStore();
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
          <Pagination lastPage={Number(topAnime?.pagination?.last_visible_page)} />
          <DataList data={topAnime?.data} />
          <Pagination lastPage={Number(topAnime?.pagination?.last_visible_page)} />
        </>
      ) : (
        <LoaderPulse />
      )}
    </div>
  );
}
