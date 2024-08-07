import { fetchData, fetchRecommendedData } from "@/actions/jikan-anime";
import { AnimeList } from "@/lib/jikan-anime-types";
import { DataTitle } from "./_components/data-title";
import { DataList } from "./_components/data-list";

export default async function Home() {
  let topAnime: AnimeList = await fetchData("top/anime", "limit=8");
  let recomendationAnime: AnimeList = await fetchRecommendedData("recommendations/anime", "entry");

  return (
    <div>
      <section className="mb-4">
        <DataTitle href="/jikan-anime/top-anime">Top Anime</DataTitle>
        <DataList data={topAnime?.data} />
      </section>
      <section className="mb-4">
        <DataTitle>Recommendation Anime</DataTitle>
        <DataList data={recomendationAnime?.data} />
      </section>
    </div>
  );
}
