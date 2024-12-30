import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { ArrowLeft, Play } from "lucide-react";

interface HeroModalProps {
  movie: Movie;
  showModal: boolean;
  trailerKey: string | null;
  onClose: () => void;
  onPlayClick: () => void;
}

export const HeroModal = ({ movie, showModal, trailerKey, onClose, onPlayClick }: HeroModalProps) => {
  return (
    <DialogContent className="max-w-3xl h-[70vh] p-0 bg-black overflow-y-auto">
      <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 z-50 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Return</span>
      </Button>
      {trailerKey ? (
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
          <p className="text-white">No trailer available</p>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            className="rounded-full bg-white hover:bg-white/90 text-black"
            onClick={onPlayClick}
          >
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">{movie.title || movie.name}</h2>
        <p className="text-gray-400">{movie.overview}</p>
      </div>
    </DialogContent>
  );
};