import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  const filteredWatchlist = watchlist.filter(item => 
    mediaType === 'movie' ? item.media_type !== 'tv' : item.media_type === 'tv'
  );

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      
      {/* Hero Section */}
      {filteredWatchlist[0] && (
        <Hero movie={filteredWatchlist[0]} />
      )}

      {/* Content Section */}
      <div className="relative z-10 -mt-32 md:-mt-48">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            {mediaType === 'movie' ? 'My Movies' : 'My TV Shows'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredWatchlist.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>

          {filteredWatchlist.length === 0 && (
            <div className="text-white text-center py-8">
              <p className="text-lg">
                {mediaType === 'movie' 
                  ? 'No movies in your watchlist yet.' 
                  : 'No TV shows in your watchlist yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;