import { Movie } from "@/services/tmdb";
import { Dialog, DialogContent } from "./ui/dialog";
import { Play } from "lucide-react";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 bg-netflix-black text-white">
        <div className="relative h-[40%]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-netflix-black/90" />
          <div className="absolute bottom-4 left-4 flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white text-netflix-black px-6 py-2 rounded-md font-bold hover:bg-white/80 transition">
              <Play className="h-5 w-5" /> Play
            </button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
          <div className="flex gap-8">
            <div className="w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-md"
              />
            </div>
            <div className="w-2/3">
              <p className="text-sm text-white/80 mb-4">{movie.overview}</p>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>•</span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};