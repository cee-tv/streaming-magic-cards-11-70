import { Movie } from "@/services/tmdb";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

interface MovieCardPlayerProps {
  movie: Movie;
  showPlayer: boolean;
  setShowPlayer: (show: boolean) => void;
}

export const MovieCardPlayer = ({ movie, showPlayer, setShowPlayer }: MovieCardPlayerProps) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const embedUrl = movie.media_type === 'movie' 
    ? `https://embed.su/embed/movie/${movie.id}`
    : `https://embed.su/embed/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`;

  return (
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
  );
};