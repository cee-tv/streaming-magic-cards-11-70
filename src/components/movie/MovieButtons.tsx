import { Plus, Check, Play, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Movie } from "@/services/tmdb";

interface MovieButtonsProps {
  movie: Movie;
  onPlay: () => void;
  onMoreInfo: () => void;
  onWatchlistToggle: () => void;
  isInWatchlist: boolean;
}

export const MovieButtons = ({ movie, onPlay, onMoreInfo, onWatchlistToggle, isInWatchlist }: MovieButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        size="icon" 
        className="rounded-full bg-white hover:bg-white/90 text-black h-8 w-8 md:h-10 md:w-10"
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
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
          onMoreInfo();
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
          onWatchlistToggle();
        }}
      >
        {isInWatchlist ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <Plus className="h-4 w-4 text-white" />
        )}
      </Button>
    </div>
  );
};