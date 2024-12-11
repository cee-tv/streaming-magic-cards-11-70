import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieCard } from "@/components/MovieCard";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchTerm, 3000); // Changed to 3000ms (3 seconds)

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => tmdb.search(debouncedSearch),
    enabled: debouncedSearch.length > 0,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search movies and TV shows..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-gray-900 text-white border-gray-700 focus:border-gray-500"
            autoFocus
          />
        </div>
        
        {debouncedSearch && (
          <h1 className="text-2xl font-bold text-white mb-6">
            {`Search results for "${debouncedSearch}"`}
          </h1>
        )}

        {isLoading ? (
          <div className="text-white text-center py-8">Loading...</div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : debouncedSearch ? (
          <div className="text-white text-center py-8">
            No results found for "{debouncedSearch}"
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;