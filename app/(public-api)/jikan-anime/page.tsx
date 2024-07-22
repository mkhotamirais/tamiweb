import { fetchData, fetchRecommendedData } from "@/actions/jikan-anime";
import { DataList } from "@/components/jikan-anime/data-list";
import { DataTitle } from "@/components/jikan-anime/data-title";
import { AnimeList } from "@/lib/jikan-anime-types";

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
