import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import { Navigation } from "@/components/Navigation";
import { tmdb } from "@/services/tmdb";
import { useState } from "react";

const Index = () => {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", mediaType],
    queryFn: () => tmdb.getTrending(mediaType),
  });

  const { data: popular = [] } = useQuery({
    queryKey: ["popular", mediaType],
    queryFn: () => tmdb.getPopular(mediaType),
  });

  const { data: topRated = [] } = useQuery({
    queryKey: ["topRated", mediaType],
    queryFn: () => tmdb.getTopRated(mediaType),
  });

  const randomMovie = trending.length > 0 
    ? trending[Math.floor(Math.random() * trending.length)]
    : null;

  if (!randomMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      <Hero movie={randomMovie} />
      <div className="container mx-auto px-4 space-y-8">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title={`Popular ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`} movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
      </div>
    </div>
  );
};

export default Index;