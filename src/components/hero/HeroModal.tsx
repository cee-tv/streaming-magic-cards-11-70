import { Movie } from "@/services/tmdb";
import { MediaModal } from "../shared/MediaModal";

interface HeroModalProps {
  movie: Movie;
  showModal: boolean;
  trailerKey: string | null;
  movieDetails: any;
  onClose: () => void;
  onPlayClick: () => void;
}

export const HeroModal = ({
  movie,
  showModal,
  trailerKey,
  movieDetails,
  onClose,
  onPlayClick,
}: HeroModalProps) => {
  return (
    <MediaModal
      media={movie}
      showModal={showModal}
      trailerKey={trailerKey}
      mediaDetails={movieDetails}
      onClose={onClose}
      onPlayClick={onPlayClick}
    />
  );
};