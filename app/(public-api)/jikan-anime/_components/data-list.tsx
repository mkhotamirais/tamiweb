import Image from "next/image";
import Link from "next/link";
import { AnimeList } from "./jikan-anime-types";

export const DataList = ({ data }: { data: AnimeList["data"] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-1">
      {data?.length > 0 ? (
        data?.map((item, index) => {
          return (
            <Link
              href={`/jikan-anime/detail/${item.mal_id}`}
              key={index}
              className="relative rounded-md overflow-hidden h-72"
            >
              <h2 className="absolute z-20 w-full bottom-0 bg-black/70 min-h-20 px-2 text-center flex items-center justify-center">
                {item.title}
              </h2>
              <Image
                src={item.images.jpg.image_url}
                width={300}
                height={300}
                alt="..."
                className="z-10 absolute w-full h-full object-center object-cover"
                priority
                quality={70}
              />
            </Link>
          );
        })
      ) : (
        <div className="text-3xl italic py-4 min-w-max">No Result</div>
      )}
    </div>
  );
};
