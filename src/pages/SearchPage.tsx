import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: results = [] } = useQuery({
    queryKey: ["search", query],
    queryFn: () => tmdb.searchMulti(query),
    enabled: !!query,
  });

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">
          Search Results for "{query}"
        </h1>
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white/80 text-center py-8">
            No results found for "{query}"
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;