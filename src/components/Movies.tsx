import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieRow } from "./MovieRow";
import { TopTenRow } from "./TopTenRow";

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

  const { data: horrorMovies = [] } = useQuery({
    queryKey: ["horror", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 27),
  });

  const { data: sciFiMovies = [] } = useQuery({
    queryKey: ["scifi", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 878),
  });

  // Get first 10 items from popular movies for Top 10
  const topTenMovies = popular.slice(0, 10);

  return (
    <div className="space-y-8 pb-20">
      <MovieRow title="Trending Now" movies={trending} />
      <TopTenRow title="Top 10 Movies on Netflix Today" movies={topTenMovies} />
      <MovieRow title="Popular on Netflix" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Action Thrillers" movies={actionMovies} />
      <MovieRow title="Comedy Movies" movies={comedyMovies} />
      <MovieRow title="Drama" movies={dramaMovies} />
      <MovieRow title="Horror" movies={horrorMovies} />
      <MovieRow title="Sci-Fi" movies={sciFiMovies} />
    </div>
  );
};
