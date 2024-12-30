import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";
import { Hero } from "@/components/Hero";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useState } from "react";

const MoviesPage = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: () => tmdb.getTrending("movie"),
  });

  const randomMovie = trending.length > 0 
    ? trending[currentMovieIndex]
    : null;

  if (!randomMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <Hero 
        movie={randomMovie} 
        onModalOpen={() => setIsPaused(true)}
        onModalClose={() => setIsPaused(false)}
        onPlayStart={() => setIsPaused(true)}
        onPlayEnd={() => setIsPaused(false)}
      />
      <div className="pt-4">
        <Movies />
      </div>
    </div>
  );
};

export default MoviesPage;