import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { VideoPlayer } from "./movie/VideoPlayer";
import { HeroControls } from "./hero/HeroControls";
import { HeroModal } from "./hero/HeroModal";
import { MediaPoster } from "./shared/MediaPoster";
import { MediaContent } from "./shared/MediaContent";

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
        <MediaPoster media={movie} />
        <MediaContent media={movie}>
          <HeroControls
            movie={movie}
            onPlayClick={handlePlayerOpen}
            onMoreInfoClick={() => handleModalOpen(true)}
          />
        </MediaContent>
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