import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieRow } from "./MovieRow";

export const TVShows = () => {
  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => tmdb.getTrending("tv"),
  });

  const { data: popular = [] } = useQuery({
    queryKey: ["popular", "tv"],
    queryFn: () => tmdb.getPopular("tv"),
  });

  const { data: topRated = [] } = useQuery({
    queryKey: ["topRated", "tv"],
    queryFn: () => tmdb.getTopRated("tv"),
  });

  const { data: actionShows = [] } = useQuery({
    queryKey: ["action", "tv"],
    queryFn: () => tmdb.getByGenre("tv", 28),
  });

  const { data: comedyShows = [] } = useQuery({
    queryKey: ["comedy", "tv"],
    queryFn: () => tmdb.getByGenre("tv", 35),
  });

  const { data: dramaShows = [] } = useQuery({
    queryKey: ["drama", "tv"],
    queryFn: () => tmdb.getByGenre("tv", 18),
  });

  return (
    <div className="container mx-auto px-4 space-y-8">
      <MovieRow title="Trending TV Shows" movies={trending} />
      <MovieRow title="Popular TV Shows" movies={popular} />
      <MovieRow title="Top Rated TV Shows" movies={topRated} />
      <MovieRow title="Action TV Shows" movies={actionShows} />
      <MovieRow title="Comedy TV Shows" movies={comedyShows} />
      <MovieRow title="Drama TV Shows" movies={dramaShows} />
    </div>
  );
};