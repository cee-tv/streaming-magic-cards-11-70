import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { X } from "lucide-react";
import { EpisodesList } from "../movie/EpisodesList";
import { MediaModalContent } from "../shared/MediaModalContent";

interface HeroModalProps {
  movie: Movie;
  showModal: boolean;
  trailerKey: string | null;
  movieDetails: any;
  seasonDetails: any;
  selectedSeason: number;
  selectedEpisode: number;
  onClose: () => void;
  onPlayClick: () => void;
  onSeasonChange: (season: string) => void;
  onEpisodeSelect: (episodeNumber: number) => void;
}

export const HeroModal = ({
  movie,
  showModal,
  trailerKey,
  movieDetails,
  seasonDetails,
  selectedSeason,
  selectedEpisode,
  onClose,
  onPlayClick,
  onSeasonChange,
  onEpisodeSelect,
}: HeroModalProps) => {
  return (
    <DialogContent className="max-w-3xl h-[45vh] p-0 bg-black overflow-y-auto">
      <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white hover:bg-white/20 h-12 w-12"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="relative pt-16"> {/* Added pt-16 for top spacing */}
          {trailerKey ? (
            <MediaModalContent
              media={movie}
              trailerKey={trailerKey}
              selectedSeason={selectedSeason}
              selectedEpisode={selectedEpisode}
              onPlayClick={onPlayClick}
            />
          ) : (
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-white">No trailer available</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        {movie.media_type === 'tv' && movieDetails?.seasons && seasonDetails?.episodes && (
          <EpisodesList
            seasons={movieDetails.seasons}
            selectedSeason={selectedSeason}
            onSeasonChange={onSeasonChange}
            episodes={seasonDetails.episodes}
            onEpisodeSelect={onEpisodeSelect}
          />
        )}
      </div>
    </DialogContent>
  );
};