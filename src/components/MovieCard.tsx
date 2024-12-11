import { useState } from "react";
import { Movie, MovieDetails, tmdb } from "@/services/tmdb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Play, Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useWatchlist } from "@/contexts/WatchlistContext";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data: movieDetails } = useQuery({
    queryKey: ["movie", movie.id],
    queryFn: () => tmdb.getMovieDetails(movie.id, movie.media_type as 'movie' | 'tv'),
    enabled: isOpen,
  });

  const handleWatchlistClick = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast({
        title: "Removed from watchlist",
        description: `${movie.title || movie.name} has been removed from your watchlist.`,
      });
    } else {
      addToWatchlist(movie);
      toast({
        title: "Added to watchlist",
        description: `${movie.title || movie.name} has been added to your watchlist.`,
      });
    }
  };

  const trailerKey = movieDetails?.videos?.results?.find(
    (video) => video.type === "Trailer"
  )?.key;

  return (
    <>
      <div
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-[2/3] rounded-md overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.svg"
            }
            alt={movie.title || movie.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {movieDetails && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {movie.title || movie.name}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  {movieDetails.overview}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {trailerKey && (
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title="Trailer"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  {trailerKey && (
                    <Button className="flex items-center gap-2">
                      <Play className="w-4 h-4" /> Play
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWatchlistClick();
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    {isInWatchlist(movie.id)
                      ? "Remove from Watchlist"
                      : "Add to Watchlist"}
                  </Button>
                </div>

                {movie.media_type === "tv" && movieDetails?.seasons && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Seasons</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {movieDetails.seasons.map((season) => (
                        <div
                          key={season.id}
                          className="bg-black/20 p-4 rounded-lg"
                        >
                          <img
                            src={
                              season.poster_path
                                ? `https://image.tmdb.org/t/p/w200${season.poster_path}`
                                : "/placeholder.svg"
                            }
                            alt={season.name}
                            className="w-full h-auto rounded-md mb-2"
                          />
                          <h4 className="font-medium">{season.name}</h4>
                          <p className="text-sm text-gray-400">
                            {season.episode_count} episodes
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};