import { Button } from "../ui/button";
import { Play, Plus, Check } from "lucide-react";
import { Movie } from "@/services/tmdb";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";

interface HeroControlsProps {
  movie: Movie;
  onPlayClick: () => void;
  onMoreInfoClick: () => void;
}

export const HeroControls = ({ movie, onPlayClick, onMoreInfoClick }: HeroControlsProps) => {
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
    <div className="flex gap-2 md:gap-4">
      <button 
        className="bg-white text-netflix-black px-4 md:px-6 py-2 rounded-md font-bold hover:bg-white/80 transition text-sm md:text-base"
        onClick={onPlayClick}
      >
        ▶ Play
      </button>
      <button 
        className="bg-gray-500/50 text-white px-4 md:px-6 py-2 rounded-md font-bold hover:bg-gray-500/70 transition text-sm md:text-base"
        onClick={onMoreInfoClick}
      >
        ℹ More Info
      </button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-white hover:border-white bg-black/30 text-white"
        onClick={handleWatchlistToggle}
      >
        {isInWatchlist(movie.id) ? (
          <Check className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};