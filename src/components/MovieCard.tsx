import { Movie } from "@/services/tmdb";
import { Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPlayer(true);
  };

  // Example trailer ID - in production this should come from your API
  const trailerVideoId = "dQw4w9WgXcQ"; // Replace with actual trailer ID

  return (
    <>
      <div className="relative group cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
          <div className="absolute bottom-0 p-4 w-full">
            <div className="flex items-center gap-2 mb-2">
              <Button 
                size="icon" 
                className="rounded-full bg-white hover:bg-white/90 text-black"
                onClick={handlePlay}
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full border-white/40 hover:border-white bg-black/30"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-white font-bold">{movie.title}</h3>
            <p className="text-white/80 text-sm mt-1">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* More Info Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 bg-netflix-black overflow-hidden">
          <DialogTitle className="sr-only">{movie.title}</DialogTitle>
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerVideoId}?autoplay=1&mute=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                className="rounded-full bg-white hover:bg-white/90 text-black"
                onClick={handlePlay}
              >
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">{movie.title}</h2>
            <p className="text-gray-400">{movie.overview}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Player Modal */}
      <Dialog open={showPlayer} onOpenChange={setShowPlayer}>
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black">
          <DialogTitle className="sr-only">Play {movie.title}</DialogTitle>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerVideoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    </>
  );
};