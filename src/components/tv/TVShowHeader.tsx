import { Movie } from "@/services/tmdb";
import { VideoPlayer } from "../movie/VideoPlayer";

interface TVShowHeaderProps {
  show: Movie;
  onModalOpen: () => void;
  onPlayStart: () => void;
  onPlayEnd: () => void;
}

export const TVShowHeader = ({ 
  show, 
  onModalOpen,
  onPlayStart,
  onPlayEnd 
}: TVShowHeaderProps) => {
  return (
    <div className="relative h-[50vh] md:h-[70vh] mb-8">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black from-0% via-netflix-black/90 via-20% to-transparent to-60%" />
      </div>
      <div className="absolute bottom-0 left-0 p-4 md:p-8 max-w-2xl">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4">
          {show.title || show.name}
        </h1>
        <p className="text-white/80 text-sm md:text-lg mb-4 line-clamp-3 md:line-clamp-none">
          {show.overview}
        </p>
        <div className="flex gap-2 md:gap-4">
          <button 
            className="bg-white text-netflix-black px-4 md:px-6 py-2 rounded-md font-bold hover:bg-white/80 transition text-sm md:text-base"
            onClick={onPlayStart}
          >
            ▶ Play
          </button>
          <button 
            className="bg-gray-500/50 text-white px-4 md:px-6 py-2 rounded-md font-bold hover:bg-gray-500/70 transition text-sm md:text-base"
            onClick={onModalOpen}
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
};