import { Play, Plus, Download, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { Movie } from "@/services/tmdb";

interface TrailerControlsProps {
  movie: Movie;
  onPlayClick: () => void;
  selectedSeason?: number;
  selectedEpisode?: number;
}

export const TrailerControls = ({
  movie,
  onPlayClick,
  selectedSeason = 1,
  selectedEpisode = 1,
}: TrailerControlsProps) => {
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
    <div className="absolute bottom-0 left-0 flex items-center gap-4 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
      <Button
        className="rounded-full bg-white hover:bg-white/90 text-black"
        onClick={onPlayClick}
      >
        <Play className="h-4 w-4 mr-2" />
        Play
      </Button>
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
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-white hover:border-white bg-black/30 text-white"
        onClick={() => {
          const downloadUrl = movie.media_type === 'movie'
            ? `https://dl.vidsrc.vip/movie/${movie.id}`
            : `https://dl.vidsrc.vip/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`;
          window.open(downloadUrl, '_blank');
        }}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};