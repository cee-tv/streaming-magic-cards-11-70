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

  // Fetch both movies and TV shows
  const { data: trendingMovies = [] } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: () => tmdb.getTrending("movie"),
  });

  const { data: trendingTVShows = [] } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => tmdb.getTrending("tv"),
  });

  // Combine and shuffle the results
  const combinedContent = [...trendingMovies, ...trendingTVShows].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (combinedContent.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => 
        prevIndex === combinedContent.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change poster every 10 seconds

    return () => clearInterval(interval);
  }, [combinedContent.length, isPaused]);

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

  const randomContent = combinedContent.length > 0 
    ? combinedContent[currentMovieIndex]
    : null;

  if (!randomContent) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <Hero 
        movie={randomContent} 
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