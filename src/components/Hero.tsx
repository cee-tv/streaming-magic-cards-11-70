import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { VideoPlayer } from "./movie/VideoPlayer";

interface HeroProps {
  movie: Movie;
}

export const Hero = ({ movie }: HeroProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const { data: movieDetails } = useQuery({
    queryKey: ["movie", movie.id, movie.media_type],
    queryFn: () => tmdb.getMovieDetails(movie.id, movie.media_type as 'movie' | 'tv'),
    enabled: showModal || showPlayer,
  });

  const trailerKey = movieDetails?.videos ? tmdb.getTrailerKey(movieDetails.videos) : null;
  const embedUrl = movie.media_type === 'movie' 
    ? `https://embed.su/embed/movie/${movie.id}`
    : `https://embed.su/embed/tv/${movie.id}/1/1`;
  const multiEmbedUrl = movie.media_type === 'movie'
    ? `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`
    : `https://multiembed.mov/?video_id=${movie.id}&tmdb=1&s=1&e=1`;

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
        <div className="absolute bottom-0 left-0 p-4 md:p-8 max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4">
            {movie.title || movie.name}
          </h1>
          <p className="text-white/80 text-sm md:text-lg mb-4 line-clamp-3 md:line-clamp-none">
            {movie.overview}
          </p>
          <div className="flex gap-2 md:gap-4">
            <button 
              className="bg-white text-netflix-black px-4 md:px-6 py-2 rounded-md font-bold hover:bg-white/80 transition text-sm md:text-base"
              onClick={() => setShowPlayer(true)}
            >
              ▶ Play
            </button>
            <button 
              className="bg-gray-500/50 text-white px-4 md:px-6 py-2 rounded-md font-bold hover:bg-gray-500/70 transition text-sm md:text-base"
              onClick={() => setShowModal(true)}
            >
              ℹ More Info
            </button>
          </div>
        </div>
      </div>

      {/* More Info Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 bg-black overflow-hidden">
          <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
          <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setShowModal(false)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Return</span>
          </Button>
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
            <h2 className="text-2xl font-bold mb-4 text-white">{movie.title || movie.name}</h2>
            <p className="text-gray-400">{movie.overview}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Player */}
      <VideoPlayer
        isOpen={showPlayer}
        onClose={() => setShowPlayer(false)}
        title={movie.title || movie.name}
        embedUrl={embedUrl}
        multiEmbedUrl={multiEmbedUrl}
      />
    </>
  );
};
