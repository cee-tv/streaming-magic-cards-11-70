import { Movie } from "@/services/tmdb";
import { MediaModal } from "../shared/MediaModal";

interface TVShowHeaderModalProps {
  show: Movie;
  showModal: boolean;
  trailerKey: string | null;
  showDetails: any;
  seasonDetails: any;
  selectedSeason: number;
  selectedEpisode: number;
  onClose: () => void;
  onPlayClick: () => void;
  onSeasonChange: (season: string) => void;
  onEpisodeSelect: (episodeNumber: number) => void;
}

export const TVShowHeaderModal = ({
  show,
  showModal,
  trailerKey,
  showDetails,
  seasonDetails,
  selectedSeason,
  selectedEpisode,
  onClose,
  onPlayClick,
  onSeasonChange,
  onEpisodeSelect,
}: TVShowHeaderModalProps) => {
  return (
    <MediaModal
      media={show}
      showModal={showModal}
      trailerKey={trailerKey}
      mediaDetails={showDetails}
      seasonDetails={seasonDetails}
      selectedSeason={selectedSeason}
      selectedEpisode={selectedEpisode}
      onClose={onClose}
      onPlayClick={onPlayClick}
      onSeasonChange={onSeasonChange}
      onEpisodeSelect={onEpisodeSelect}
    />
  );
};