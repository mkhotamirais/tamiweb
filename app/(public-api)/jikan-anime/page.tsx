import { JikanHomePage } from "./_components/jikan-home";
import { fetchData, fetchRecommendedData } from "@/actions/jikan-anime";
import { AnimeList } from "./_components/jikan-anime-types";

export default async function Home() {
  let topAnime: AnimeList = await fetchData("top/anime", "limit=8");
  let recomendationAnime: AnimeList = await fetchRecommendedData("recommendations/anime", "entry");

  return <JikanHomePage topAnime={topAnime} recomendationAnime={recomendationAnime} />;
}
