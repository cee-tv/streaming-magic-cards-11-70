import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { VideoPlayer } from "./movie/VideoPlayer";
import { HeroControls } from "./hero/HeroControls";
import { HeroModal } from "./hero/HeroModal";

interface HeroProps {
  movie: Movie;
  onModalOpen?: () => void;
  onModalClose?: () => void;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export const Hero = ({ 
  movie, 
  onModalOpen, 
  onModalClose,
  onPlayStart,
  onPlayEnd 
}: HeroProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: movieDetails } = useQuery({
    queryKey: ["movie", movie.id, movie.media_type],
    queryFn: () => tmdb.getMovieDetails(movie.id, movie.media_type as 'movie' | 'tv'),
    enabled: showModal || showPlayer,
  });

  const { data: seasonDetails } = useQuery({
    queryKey: ["season", movie.id, selectedSeason],
    queryFn: () => tmdb.getTVSeasonDetails(movie.id, selectedSeason),
    enabled: showModal && movie.media_type === 'tv',
  });

  const trailerKey = movieDetails?.videos ? tmdb.getTrailerKey(movieDetails.videos) : null;

  const embedUrl = movie.media_type === 'movie' 
    ? `https://embed.su/embed/movie/${movie.id}`
    : `https://embed.su/embed/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`;
  const multiEmbedUrl = movie.media_type === 'movie'
    ? `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`
    : `https://multiembed.mov/?video_id=${movie.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`;

  const handleModalOpen = (open: boolean) => {
    setShowModal(open);
    if (open) {
      if (onModalOpen) onModalOpen();
    } else {
      if (onModalClose) onModalClose();
    }
  };

  const handlePlayerOpen = () => {
    setShowPlayer(true);
    if (onPlayStart) onPlayStart();
  };

  const handlePlayerClose = () => {
    setShowPlayer(false);
    if (onPlayEnd) onPlayEnd();
  };

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(parseInt(season));
    setSelectedEpisode(1);
  };

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
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-netflix-black" />
        </div>
        <div className="absolute bottom-0 left-0 p-4 md:p-8 max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4">
            {movie.title || movie.name}
          </h1>
          <p className="text-white/80 text-sm md:text-lg mb-4 line-clamp-3 md:line-clamp-none">
            {movie.overview}
          </p>
          <HeroControls
            movie={movie}
            onPlayClick={handlePlayerOpen}
            onMoreInfoClick={() => handleModalOpen(true)}
          />
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={handleModalOpen}>
        <HeroModal
          movie={movie}
          showModal={showModal}
          trailerKey={trailerKey}
          movieDetails={movieDetails}
          seasonDetails={seasonDetails}
          selectedSeason={selectedSeason}
          selectedEpisode={selectedEpisode}
          onClose={() => handleModalOpen(false)}
          onPlayClick={() => {
            handleModalOpen(false);
            setShowPlayer(true);
          }}
          onSeasonChange={handleSeasonChange}
          onEpisodeSelect={(episodeNumber) => {
            setSelectedEpisode(episodeNumber);
            handleModalOpen(false);
            setShowPlayer(true);
          }}
        />
      </Dialog>

      <VideoPlayer
        isOpen={showPlayer}
        onClose={handlePlayerClose}
        title={movie.title || movie.name}
        embedUrl={embedUrl}
        multiEmbedUrl={multiEmbedUrl}
        movieId={movie.id}
        mediaType={movie.media_type as 'movie' | 'tv'}
        season={selectedSeason}
        episode={selectedEpisode}
      />
    </>
  );
};