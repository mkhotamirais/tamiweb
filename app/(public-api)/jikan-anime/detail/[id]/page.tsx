import Image from "next/image";
import { fetchData } from "@/actions/jikan-anime";
import { TrailerYoutube } from "../../_components/trailer-youtube";
import { AnimeListData } from "../../_components/jikan-anime-types";
import { Metadata } from "next";

export const generateMetadata = ({ params: { id } }: { params: { id: string } }): Metadata => {
  return {
    title: `Detail ${id}`,
  };
};

export default async function DetailAnimeId({ params: { id } }: { params: { id: string } }) {
  const result = await fetchData(`anime/${id}`);
  const anime: AnimeListData = result?.data;

  return (
    <div className="max-w-3xl p-3 rounded-t mx-auto bg-jikan-primary">
      <h2 className="text-3xl font-bold mb-5 mt-3">{anime?.title}</h2>
      <div className="grid grid-cols-1 text-sm sm:grid-cols-4 gap-x-0 gap-y-8 sm:gap-x-3">
        <div className="col-span-1 flex flex-col gap-4">
          <Image
            src={anime?.images?.jpg?.image_url}
            width={300}
            height={300}
            alt="..."
            priority
            className="w-full rounded-lg overflow-hidden"
          />
          <TrailerYoutube data={anime?.trailer} />
        </div>
        <div className="col-span-3 leading-relaxed flex flex-col gap-2">
          <div>
            <b>Title: </b>
            {anime?.title}
          </div>
          <div>
            <b>Synopsis: </b>
            {anime?.synopsis}
          </div>
          <div>
            <b>Genres: </b>
            <div className="inline-flex gap-2 flex-wrap">
              {anime?.genres?.map((item) => (
                <a href={item?.url} key={item?.mal_id} className="underline">
                  {item?.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <b>Year: </b>
            {anime?.year}
          </div>
          <div>
            <b>Episodes: </b>
            {anime?.episodes}
          </div>
          <div>
            <b>Source: </b>
            {anime?.source}
          </div>
          <div>
            <b>Status: </b>
            {anime?.status}
          </div>
          <div>
            <b>Type: </b>
            {anime?.type}
          </div>
          <div>
            <b>Aired: </b>
            {anime?.aired?.string}
          </div>
          <div>
            <b>Duration: </b>
            {anime?.duration}
          </div>
          <div>
            <b>Rank: </b>
            {anime?.rank}
          </div>
          <div>
            <b>Season: </b>
            {anime?.season}
          </div>
          <div>
            <b>Producers: </b>
            <div className="inline-flex gap-2 flex-wrap">
              {anime?.producers?.map((item) => (
                <a href={item?.url} key={item?.mal_id} className="underline">
                  {item?.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
