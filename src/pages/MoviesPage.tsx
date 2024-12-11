import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";
import { Hero } from "@/components/Hero";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

const MoviesPage = () => {
  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: () => tmdb.getTrending("movie"),
  });

  const randomMovie = trending.length > 0 
    ? trending[Math.floor(Math.random() * trending.length)]
    : null;

  const handleMediaTypeChange = (type: "movie" | "tv") => {
    // Handle media type change if needed
  };

  if (!randomMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={handleMediaTypeChange} />
      <Hero movie={randomMovie} />
      <div className="pt-4">
        <Movies />
      </div>
    </div>
  );
};

export default MoviesPage;