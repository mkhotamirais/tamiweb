"use client";

import { fetchData } from "@/actions/jikan-anime";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";
import React, { useEffect } from "react";
import { DataTitle } from "../../_components/data-title";
import { Pagination } from "../../_components/pagination";
import { DataList } from "../../_components/data-list";
import { LoaderJikan } from "../../_components/loader-jikan";

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
        <LoaderJikan />
      )}
    </div>
  );
}
