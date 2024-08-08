export type AnimeList = {
  pagination?: { last_visible_page: number; items: { total: number } };
  data: AnimeListData[];
};

export type AnimeListData = {
  mal_id: string;
  title: string;
  images: { jpg: { image_url: string } };
  synopsis?: string;
  year?: string;
  episodes?: string;
  source?: string;
  status?: string;
  type?: string;
  duration?: string;
  rank?: string;
  aired?: { string: string };
  season?: string;
  producers?: { url: string; mal_id: string; name: string }[];
  genres?: { url: string; mal_id: string; name: string }[];
  trailer?: { youtube_id: string; url: string; embed_url: string };
};

export type AnimeListDataEntry = {
  mal_id: string;
  title: string;
  images: { jpg: { image_url: string } };
  url: string;
};

export type RecommendationList = {
  pagination?: { last_visible_page: number };
  data: {
    mal_id: string;
    title: string;
    images: { jpg: { image_url: string } };
    entry: AnimeListDataEntry;
  }[];
};
