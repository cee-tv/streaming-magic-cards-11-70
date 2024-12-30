import { Navigation } from "@/components/Navigation";
import { TVShows } from "@/components/TVShows";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useState, useEffect } from "react";
import { TVShowHeader } from "@/components/tv/TVShowHeader";

const TVShowsPage = () => {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => tmdb.getTrending("tv"),
  });

  // Auto-rotate header show
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

  const currentShow = trending[currentShowIndex];

  if (!currentShow) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <TVShowHeader 
        show={currentShow}
        onPause={setIsPaused}
      />
      <div className="pt-4">
        <TVShows />
      </div>
    </div>
  );
};

export default TVShowsPage;