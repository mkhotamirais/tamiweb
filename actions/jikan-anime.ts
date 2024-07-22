import { AnimeList, AnimeListDataEntry, RecommendationList } from "@/lib/jikan-anime-types";

export async function fetchData(resource?: string, query?: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_JIKAN_ANIME}/${resource}?${query}`);
  const anime = await response.json();
  return anime;
}

export async function fetchRecommendedData(resource: string, objectProperty?: string) {
  const response: RecommendationList = await fetchData(resource);
  const anime: AnimeListDataEntry[] = response?.data.flatMap((item) => item?.entry);
  const result = sliceRecommendedData({ data: anime });
  return result;
}

function sliceRecommendedData({ data, gap = 8 }: { data: AnimeListDataEntry[]; gap?: number }) {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;
  const result = { data: data.slice(first, last) };
  return result;
}
