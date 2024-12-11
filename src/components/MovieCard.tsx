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
        className="relative cursor-pointer rounded-md overflow-hidden"
        onClick={() => setShowModal(true)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* More Info Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 bg-black overflow-hidden">
          <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
          <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setShowModal(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          {trailerKey ? (
            <div className="relative w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                className="bg-white hover:bg-white/90 text-black"
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
                className="border-white hover:border-white bg-transparent text-white"
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
            <h2 className="text-2xl font-bold mb-4 text-white">{movie.title || movie.name}</h2>
            <p className="text-gray-400">{movie.overview}</p>
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