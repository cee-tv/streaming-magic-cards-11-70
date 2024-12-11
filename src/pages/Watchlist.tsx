import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { useState } from "react";
import { MovieRow } from "@/components/MovieRow";

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  const filteredWatchlist = watchlist.filter(item => 
    mediaType === 'movie' ? item.media_type !== 'tv' : item.media_type === 'tv'
  );

  // Group movies by genre (you can add more genres as needed)
  const actionMovies = filteredWatchlist.filter(item => item.genre_ids?.includes(28));
  const comedyMovies = filteredWatchlist.filter(item => item.genre_ids?.includes(35));
  const dramaMovies = filteredWatchlist.filter(item => item.genre_ids?.includes(18));
  
  // Get a random movie for the hero section
  const randomMovie = filteredWatchlist.length > 0 
    ? filteredWatchlist[Math.floor(Math.random() * filteredWatchlist.length)]
    : null;

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-white mb-8">
          My {mediaType === 'movie' ? 'Movies' : 'TV Shows'}
        </h1>
        
        {filteredWatchlist.length === 0 ? (
          <div className="text-white text-center py-12">
            <p className="text-xl">
              No {mediaType === 'movie' ? 'movies' : 'TV shows'} in your watchlist yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <MovieRow 
              title="All Watchlist" 
              movies={filteredWatchlist}
            />
            {mediaType === 'movie' && (
              <>
                {actionMovies.length > 0 && (
                  <MovieRow title="Action" movies={actionMovies} />
                )}
                {comedyMovies.length > 0 && (
                  <MovieRow title="Comedy" movies={comedyMovies} />
                )}
                {dramaMovies.length > 0 && (
                  <MovieRow title="Drama" movies={dramaMovies} />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;