import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { useWatchlist } from "@/contexts/WatchlistContext";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-white mb-8">Watchlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;