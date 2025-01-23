import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";
import { TVShows } from "@/components/TVShows";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

const Index = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "all"],
    queryFn: () => tmdb.getTrending("movie"),
  });

  useEffect(() => {
    if (trending.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => 
        prevIndex === trending.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change poster every 10 seconds

    return () => clearInterval(interval);
  }, [trending.length, isPaused]);

  const handleModalOpen = () => {
    setIsPaused(true);
  };

  const handleModalClose = () => {
    setIsPaused(false);
  };

  const handlePlayStart = () => {
    setIsPaused(true);
  };

  const handlePlayEnd = () => {
    setIsPaused(false);
  };

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
        onModalOpen={handleModalOpen}
        onModalClose={handleModalClose}
        onPlayStart={handlePlayStart}
        onPlayEnd={handlePlayEnd}
      />
      <Movies />
      <TVShows />
    </div>
  );
};

export default Index;