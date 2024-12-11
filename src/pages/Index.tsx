import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import { Navigation } from "@/components/Navigation";
import { tmdb } from "@/services/tmdb";

const Index = () => {
  const { data: trending = [] } = useQuery({
    queryKey: ["trending"],
    queryFn: tmdb.getTrending,
  });

  const { data: popular = [] } = useQuery({
    queryKey: ["popular"],
    queryFn: tmdb.getPopular,
  });

  const { data: topRated = [] } = useQuery({
    queryKey: ["topRated"],
    queryFn: tmdb.getTopRated,
  });

  if (trending.length === 0) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation />
      <Hero movie={trending[0]} />
      <div className="container mx-auto px-4">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular on Netflix" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
      </div>
    </div>
  );
};

export default Index;