import MovieCard from "./_components/MovieCard";
import { TmdbMovie } from "./_components/tmdb-type";

export default async function TmdbApp({ searchParams }: { searchParams: { genre: string } }) {
  // const { cari } = useTmdb();
  const genre = searchParams.genre || "fetchTrending";
  const res = await fetch(
    `https://api.themoviedb.org/3${genre === "fetchTopRated" ? "/movie/top_rated" : "/trending/all/week"}?api_key=${
      process.env.TMDB_API_KEY
    }&language=en-US&page=1`,
    { next: { revalidate: 50 } }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results: TmdbMovie[] = data.results;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {results.map((item, index) => (
        <MovieCard key={index} item={item} />
      ))}
    </div>
  );
}
