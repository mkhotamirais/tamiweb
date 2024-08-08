import Image from "next/image";
import Link from "next/link";
import { TmdbMovie } from "./tmdb-type";

export default function MovieCard({ item }: { item: TmdbMovie }) {
  return (
    <div>
      <Link href={`/fullstack/tmdb/${item.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original${item?.backdrop_path || item?.poster_path}`}
          alt={item?.title}
          width={200}
          height={200}
          quality={70}
          className="sm:rounded-t-lg w-full h-full object-cover object-center"
        />
      </Link>
    </div>
  );
}
