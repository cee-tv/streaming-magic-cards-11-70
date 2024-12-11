import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { useState } from "react";
import { useWatchlist } from "@/contexts/WatchlistContext";

const Watchlist = () => {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const { watchlist } = useWatchlist();

  const filteredWatchlist = watchlist.filter(item => 
    mediaType === 'movie' ? !item.first_air_date : item.first_air_date
  );

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">My Watchlist</h1>
        {filteredWatchlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredWatchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white/80 text-center py-8">
            Your watchlist is empty. Add some {mediaType === 'movie' ? 'movies' : 'TV shows'} to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;