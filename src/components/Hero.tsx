import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

interface HeroProps {
  movie: Movie;
}

export const Hero = ({ movie }: HeroProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const { data: movieDetails } = useQuery({
    queryKey: ["movie", movie.id],
    queryFn: () => tmdb.getMovieDetails(movie.id),
    enabled: showModal || showPlayer,
  });

  const trailerKey = movieDetails?.videos ? tmdb.getTrailerKey(movieDetails.videos) : null;

  return (
    <>
      <div className="relative h-[50vh] md:h-[70vh] mb-8">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>
          <p className="text-white/80 text-lg mb-4">{movie.overview}</p>
          <div className="flex gap-4">
            <button 
              className="bg-white text-netflix-black px-6 py-2 rounded-md font-bold hover:bg-white/80 transition"
              onClick={() => setShowPlayer(true)}
            >
              ▶ Play
            </button>
            <button 
              className="bg-gray-500/50 text-white px-6 py-2 rounded-md font-bold hover:bg-gray-500/70 transition"
              onClick={() => setShowModal(true)}
            >
              ℹ More Info
            </button>
          </div>
        </div>
      </div>

      {/* More Info Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 bg-netflix-black overflow-hidden">
          <DialogTitle className="sr-only">{movie.title}</DialogTitle>
          {trailerKey && (
            <div className="relative w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <button 
                className="bg-white text-netflix-black px-6 py-2 rounded-md font-bold hover:bg-white/80 transition flex items-center gap-2"
                onClick={() => {
                  setShowModal(false);
                  setShowPlayer(true);
                }}
              >
                ▶ Play
              </button>
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
          {trailerKey && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};