"use client";

import { fetchData } from "@/actions/jikan-anime";
import { DataList } from "@/components/jikan-anime/data-list";
import { DataTitle } from "@/components/jikan-anime/data-title";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";
import React, { useEffect } from "react";
import { LoaderPulse } from "@/components/jikan-anime/loader-pulse";
import { Pagination } from "@/components/jikan-anime/pagination";

export default function SearchKeyword({ params }: { params: { keyword: string } }) {
  const { page, searchResult, setSearchResult } = useJikanAnimeStore();
  const total = searchResult?.pagination?.items?.total;
  const last_visible_page = searchResult?.pagination?.last_visible_page;

  useEffect(() => {
    const getAnime = async () => {
      const data = await fetchData("anime", `q=${params.keyword}&page=${page}`);
      setSearchResult(data);
    };
    getAnime();
  }, [page, setSearchResult, params]);

  return (
    <div>
      <DataTitle>
        Result for: <span className="italic text-jikan-accent">{decodeURI(params.keyword)}</span>
      </DataTitle>
      {searchResult?.data ? (
        <>
          <Pagination total={Number(total)} lastPage={Number(last_visible_page)} />
          <DataList data={searchResult?.data} />
          <Pagination total={Number(total)} lastPage={Number(last_visible_page)} />
        </>
      ) : (
        <LoaderPulse />
      )}
    </div>
  );
}
