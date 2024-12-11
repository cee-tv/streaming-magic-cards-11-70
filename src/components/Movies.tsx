import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieRow } from "./MovieRow";

export const Movies = () => {
  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: () => tmdb.getTrending("movie"),
  });

  const { data: popular = [] } = useQuery({
    queryKey: ["popular", "movie"],
    queryFn: () => tmdb.getPopular("movie"),
  });

  const { data: topRated = [] } = useQuery({
    queryKey: ["topRated", "movie"],
    queryFn: () => tmdb.getTopRated("movie"),
  });

  const { data: actionMovies = [] } = useQuery({
    queryKey: ["action", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 28),
  });

  const { data: comedyMovies = [] } = useQuery({
    queryKey: ["comedy", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 35),
  });

  const { data: dramaMovies = [] } = useQuery({
    queryKey: ["drama", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 18),
  });

  return (
    <div className="container mx-auto px-4 space-y-8">
      <MovieRow title="Trending Movies" movies={trending} />
      <MovieRow title="Popular Movies" movies={popular} />
      <MovieRow title="Top Rated Movies" movies={topRated} />
      <MovieRow title="Action Movies" movies={actionMovies} />
      <MovieRow title="Comedy Movies" movies={comedyMovies} />
      <MovieRow title="Drama Movies" movies={dramaMovies} />
    </div>
  );
};