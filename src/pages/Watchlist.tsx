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
        <h1 className="text-4xl font-bold text-white mb-2">
          {mediaType === 'movie' ? 'My Movies' : 'My TV Shows'}
        </h1>
        <p className="text-gray-400 mb-8">
          {mediaType === 'movie' 
            ? 'Your collection of favorite movies' 
            : 'Your collection of favorite TV shows'}
        </p>
        
        {filteredWatchlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-xl">
              {mediaType === 'movie' 
                ? 'No movies in your watchlist yet.' 
                : 'No TV shows in your watchlist yet.'}
            </p>
            <p className="text-gray-400 mt-2">
              {mediaType === 'movie'
                ? 'Start adding movies to build your collection!'
                : 'Start adding TV shows to build your collection!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredWatchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;