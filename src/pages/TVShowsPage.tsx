import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useEffect, useState } from "react";
import { TVShowContent } from "@/components/tv/TVShowContent";

const TVShowsPage = () => {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => tmdb.getTrending("tv"),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPaused && trending.length > 0) {
      interval = setInterval(() => {
        setCurrentShowIndex((prev) => 
          prev === trending.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [trending.length, isPaused]);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <TVShowContent 
        trending={trending}
        currentShowIndex={currentShowIndex}
        isPaused={isPaused}
        onModalOpen={() => setIsPaused(true)}
        onModalClose={() => setIsPaused(false)}
        onPlayStart={() => setIsPaused(true)}
        onPlayEnd={() => setIsPaused(false)}
      />
    </div>
  );
};

export default TVShowsPage;