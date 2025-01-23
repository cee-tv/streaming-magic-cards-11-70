import { Movie } from "@/services/tmdb";
import { VideoPlayer } from "../movie/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { TVShowHeaderControls } from "./TVShowHeaderControls";

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
  const { data: showDetails } = useQuery({
    queryKey: ["movie", show.id, show.media_type],
    queryFn: () => tmdb.getMovieDetails(show.id, show.media_type as 'movie' | 'tv'),
  });

  const trailerKey = showDetails?.videos ? tmdb.getTrailerKey(showDetails.videos) : null;

  return (
    <div className="relative h-[50vh] md:h-[70vh] mb-8">
      <div className="absolute inset-0">
        {trailerKey ? (
          <div className="relative w-full h-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&mute=1&loop=1&playlist=${trailerKey}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black from-0% via-netflix-black/90 via-20% to-transparent to-60%" />
          </div>
        ) : (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
              alt={show.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black from-0% via-netflix-black/90 via-20% to-transparent to-60%" />
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 p-4 md:p-8 max-w-2xl">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4">
          {show.name}
        </h1>
        <p className="text-white/80 text-sm md:text-lg mb-4 line-clamp-3 md:line-clamp-none">
          {show.overview}
        </p>
        <TVShowHeaderControls
          show={show}
          onPlayClick={onPlayStart}
          onMoreInfoClick={onModalOpen}
        />
      </div>
    </div>
  );
};