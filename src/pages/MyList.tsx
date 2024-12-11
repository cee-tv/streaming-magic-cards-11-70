import { Navigation } from "@/components/Navigation";
import { MovieCard } from "@/components/MovieCard";
import { useState } from "react";
import { Movie } from "@/services/tmdb";

const MyList = () => {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  // This is a placeholder. In a real app, you'd fetch this from your backend or local storage
  const [favorites] = useState<Movie[]>([]);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">My List</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white/80 text-center py-8">
            Your list is empty. Add some movies or TV shows to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyList;