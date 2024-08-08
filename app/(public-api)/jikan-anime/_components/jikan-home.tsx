"use client";

import { DataList } from "./data-list";
import { DataTitle } from "./data-title";
import { useJikan } from "./use-jikan";

export function JikanHomePage({ topAnime, recomendationAnime }: { topAnime: any; recomendationAnime: any }) {
  const { searchBox, hideSearchBox } = useJikan();

  const onMouseEnter = () => {
    if (searchBox) hideSearchBox();
  };

  return (
    <main onMouseEnter={onMouseEnter} className="px-3 flex-grow">
      <section className="mb-4">
        <DataTitle href="/jikan-anime/top-anime">Top Anime</DataTitle>
        <DataList data={topAnime?.data} />
      </section>
      <section className="mb-4">
        <DataTitle>Recommendation Anime</DataTitle>
        <DataList data={recomendationAnime?.data} />
      </section>
    </main>
  );
}
