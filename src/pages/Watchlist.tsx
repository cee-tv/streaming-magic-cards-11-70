import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { useState } from "react";

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  const filteredWatchlist = watchlist.filter(item => 
    mediaType === 'movie' ? item.media_type !== 'tv' : item.media_type === 'tv'
  );

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-white mb-8">Watchlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredWatchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;