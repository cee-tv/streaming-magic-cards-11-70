import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";
import { Hero } from "@/components/Hero";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useEffect, useState } from "react";

const MoviesPage = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: () => tmdb.getTrending("movie"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (trending.length > 0) {
        setCurrentMovieIndex((prev) => 
          prev === trending.length - 1 ? 0 : prev + 1
        );
      }
    }, 5000); // Changed from 4000 to 5000

    return () => clearInterval(interval);
  }, [trending.length]);

  const randomMovie = trending.length > 0 
    ? trending[currentMovieIndex]
    : null;

  if (!randomMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <Hero movie={randomMovie} />
      <div className="pt-4">
        <Movies />
      </div>
    </div>
  );
};

export default MoviesPage;