import Image from "next/image";
import React from "react";

export default async function TmdbId({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.TMDB_API_KEY}`);
  const movie = await res.json();
  console.log(movie);
  return (
    <div>
      TmdbId {params.id}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie?.title}
        width={200}
        height={200}
        className="sm:rounded-t-lg w-full h-full object-cover object-center"
      />
    </div>
  );
}
