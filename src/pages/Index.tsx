import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";
import { TVShows } from "@/components/TVShows";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

const Index = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "all"],
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
      <Hero movie={randomMovie} />
      <Movies />
      <TVShows />
    </div>
  );
};

export default Index;