import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieRow } from "@/components/MovieRow";

const MoviesPage = () => {
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
    queryFn: () => tmdb.getByGenre("movie", 28), // Action
  });

  const { data: dramaMovies = [] } = useQuery({
    queryKey: ["drama", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 18), // Drama
  });

  const { data: comedyMovies = [] } = useQuery({
    queryKey: ["comedy", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 35), // Comedy
  });

  const { data: thrillerMovies = [] } = useQuery({
    queryKey: ["thriller", "movie"],
    queryFn: () => tmdb.getByGenre("movie", 53), // Thriller
  });

  const randomMovie = trending.length > 0 
    ? trending[Math.floor(Math.random() * trending.length)]
    : null;

  if (!randomMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation />
      <Hero movie={randomMovie} />
      <div className="space-y-8 pb-20">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular on Netflix" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Action Movies" movies={actionMovies} />
        <MovieRow title="Drama" movies={dramaMovies} />
        <MovieRow title="Comedy" movies={comedyMovies} />
        <MovieRow title="Thrillers" movies={thrillerMovies} />
      </div>
    </div>
  );
};

export default MoviesPage;