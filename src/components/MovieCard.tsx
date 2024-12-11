import { Movie } from "@/services/tmdb";
import { Play, ChevronDown, X, Plus, Check } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data: movieDetails } = useQuery({
    queryKey: ["movie", movie.id, movie.media_type],
    queryFn: () => tmdb.getMovieDetails(movie.id, movie.media_type as 'movie' | 'tv'),
    enabled: showModal || showPlayer,
  });

  const trailerKey = movieDetails?.videos ? tmdb.getTrailerKey(movieDetails.videos) : null;
  const embedUrl = movie.media_type === 'movie' 
    ? `https://embed.su/embed/movie/${movie.id}`
    : `https://embed.su/embed/tv/${movie.id}/1/1`;

  const handleWatchlistToggle = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast.success("Removed from watchlist");
    } else {
      addToWatchlist(movie);
      toast.success("Added to watchlist");
    }
  };

  return (
    <>
      <div 
        className="relative group cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
          <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4">
            <h3 className="text-white font-bold text-xs md:text-sm line-clamp-2">
              {movie.title || movie.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-zinc-900 border-none">
          <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
          <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
          
          <div className="relative w-full aspect-video">
            {trailerKey ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
              onClick={() => setShowModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                className="rounded-full bg-white hover:bg-white/90 text-black"
                onClick={() => {
                  setShowModal(false);
                  setShowPlayer(true);
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white hover:border-white bg-black/30 text-white"
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist(movie.id) ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Watchlist
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">{movie.title || movie.name}</h2>
              <p className="text-lg text-gray-300">{movie.overview}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Player Modal */}
      <Dialog open={showPlayer} onOpenChange={setShowPlayer}>
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black">
          <DialogTitle className="sr-only">Play {movie.title || movie.name}</DialogTitle>
          <DialogDescription className="sr-only">Video player for {movie.title || movie.name}</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setShowPlayer(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <iframe
            className="w-full h-full"
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    </>
  );
};