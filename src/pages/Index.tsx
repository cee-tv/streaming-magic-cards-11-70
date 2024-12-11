import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";
import { TVShows } from "@/components/TVShows";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

const Index = () => {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", mediaType],
    queryFn: () => tmdb.getTrending(mediaType),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (trending.length > 0) {
        setCurrentMovieIndex((prevIndex) => 
          prevIndex === trending.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [trending]);

  const randomMovie = trending.length > 0 
    ? trending[currentMovieIndex]
    : null;

  if (!randomMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      <Hero movie={randomMovie} />
      {mediaType === 'movie' ? <Movies /> : <TVShows />}
    </div>
  );
};

export default Index;