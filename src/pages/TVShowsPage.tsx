import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieRow } from "@/components/MovieRow";

const TVShowsPage = () => {
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
    queryFn: () => tmdb.getByGenre("tv", 10759), // Action & Adventure
  });

  const { data: dramaShows = [] } = useQuery({
    queryKey: ["drama", "tv"],
    queryFn: () => tmdb.getByGenre("tv", 18), // Drama
  });

  const { data: comedyShows = [] } = useQuery({
    queryKey: ["comedy", "tv"],
    queryFn: () => tmdb.getByGenre("tv", 35), // Comedy
  });

  const { data: crimeShows = [] } = useQuery({
    queryKey: ["crime", "tv"],
    queryFn: () => tmdb.getByGenre("tv", 80), // Crime
  });

  const randomShow = trending.length > 0 
    ? trending[Math.floor(Math.random() * trending.length)]
    : null;

  if (!randomShow) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation />
      <Hero movie={randomShow} />
      <div className="space-y-8 pb-20">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular on Netflix" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Action & Adventure" movies={actionShows} />
        <MovieRow title="Drama Shows" movies={dramaShows} />
        <MovieRow title="Comedy Hits" movies={comedyShows} />
        <MovieRow title="Crime TV Shows" movies={crimeShows} />
      </div>
    </div>
  );
};

export default TVShowsPage;