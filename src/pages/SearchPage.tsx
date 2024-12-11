import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieCard } from "@/components/MovieCard";
import { Navigation } from "@/components/Navigation";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => tmdb.searchMulti(query),
    enabled: query.length > 0,
  });

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <div className="pt-24 px-4">
        <h1 className="text-2xl font-bold text-white mb-6">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {isLoading && (
          <div className="text-white text-center py-8">Loading...</div>
        )}
        {!isLoading && searchResults.length === 0 && query && (
          <div className="text-white text-center py-8">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;