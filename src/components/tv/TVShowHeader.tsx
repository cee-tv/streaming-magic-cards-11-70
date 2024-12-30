import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { MovieCard } from "../MovieCard";
import { Button } from "../ui/button";
import { Play, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";

interface TVShowHeaderProps {
  show: Movie;
  onPause: (paused: boolean) => void;
}

export const TVShowHeader = ({ show, onPause }: TVShowHeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleWatchlistToggle = () => {
    if (isInWatchlist(show.id)) {
      removeFromWatchlist(show.id);
      toast.success("Removed from watchlist");
    } else {
      addToWatchlist(show);
      toast.success("Added to watchlist");
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-netflix-black z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent z-10" />
      <img
        src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
        alt={show.name}
        className="w-full h-[80vh] object-cover object-center"
      />
      <div className="absolute bottom-0 left-0 p-8 z-20 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-white">{show.name}</h1>
        <p className="text-lg text-gray-200 mb-6">{show.overview}</p>
        <div className="flex items-center gap-4">
          <Button 
            className="rounded-full bg-white hover:bg-white/90 text-black"
            onClick={() => {
              setShowPlayer(true);
              onPause(true);
            }}
          >
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-white hover:border-white bg-black/30 text-white"
            onClick={() => {
              setShowModal(true);
              onPause(true);
            }}
          >
            More Info
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-white hover:border-white bg-black/30 text-white"
            onClick={handleWatchlistToggle}
          >
            {isInWatchlist(show.id) ? (
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
      </div>

      {/* Use MovieCard's modal and player functionality */}
      <MovieCard
        movie={show}
        modalOpen={showModal}
        onModalOpenChange={(open) => {
          setShowModal(open);
          onPause(open);
        }}
        playerOpen={showPlayer}
        onPlayerOpenChange={(open) => {
          setShowPlayer(open);
          onPause(open);
        }}
      />
    </div>
  );
};