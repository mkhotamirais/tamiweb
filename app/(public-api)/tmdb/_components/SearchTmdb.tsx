import { FaMagnifyingGlass } from "react-icons/fa6";
import { useTmdb } from "./use-tmdb";

export default function SearchTmdb() {
  const { cari, setCari } = useTmdb();

  return (
    <form action="">
      <input
        value={cari}
        type="text"
        className="border rounded p-2 bg-inherit"
        placeholder="Search here..."
        onChange={(e) => setCari(e.target.value)}
      />
      <button
        disabled={cari === "" || !cari}
        type="submit"
        aria-label="search movie"
        className="border p-2 disabled:text-gray-400"
      >
        <FaMagnifyingGlass />
      </button>
    </form>
  );
}
