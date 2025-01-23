import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";
import { TVShows } from "@/components/TVShows";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

const Index = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
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

  // Combine and shuffle movies and TV shows
  const allTrendingContent = [...trendingMovies, ...trendingTVShows].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (allTrendingContent.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentContentIndex((prevIndex) => 
        prevIndex === allTrendingContent.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change content every 10 seconds

    return () => clearInterval(interval);
  }, [allTrendingContent.length, isPaused]);

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

  const randomContent = allTrendingContent.length > 0 
    ? allTrendingContent[currentContentIndex]
    : null;

  console.log("Current hero content:", randomContent);

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