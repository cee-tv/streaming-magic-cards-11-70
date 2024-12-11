import { Navigation } from "@/components/Navigation";
import { TVShows } from "@/components/TVShows";
import { Hero } from "@/components/Hero";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useState, useEffect } from "react";

const TVShowsPage = () => {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => tmdb.getTrending("tv"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (trending.length > 0) {
        setCurrentShowIndex((prev) => 
          prev === trending.length - 1 ? 0 : prev + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [trending.length]);

  const randomShow = trending.length > 0 
    ? trending[currentShowIndex]
    : null;

  if (!randomShow) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <Hero movie={randomShow} />
      <div className="pt-4">
        <TVShows />
      </div>
    </div>
  );
};

export default TVShowsPage;