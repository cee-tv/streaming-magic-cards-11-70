import { Movie } from "@/services/tmdb";
import { Play, ChevronDown, X, Plus, Check } from "lucide-react";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import { Button } from "./ui/button";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { MovieCardModal } from "./MovieCardModal";
import { MovieCardPlayer } from "./MovieCardPlayer";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

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
      <div className="relative group cursor-pointer">
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
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                className="rounded-full bg-white hover:bg-white/90 text-black h-8 w-8 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlayer(true);
                }}
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full border-white hover:border-white bg-black/30 h-8 w-8 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                <ChevronDown className="h-4 w-4 text-white" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-white hover:border-white bg-black/30 h-8 w-8 md:h-10 md:w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWatchlistToggle();
                }}
              >
                {isInWatchlist(movie.id) ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Plus className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MovieCardModal 
        movie={movie}
        showModal={showModal}
        setShowModal={setShowModal}
        setShowPlayer={setShowPlayer}
        handleWatchlistToggle={handleWatchlistToggle}
        isInWatchlist={isInWatchlist}
      />

      <MovieCardPlayer
        movie={movie}
        showPlayer={showPlayer}
        setShowPlayer={setShowPlayer}
      />
    </>
  );
};