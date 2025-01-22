import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { ArrowLeft } from "lucide-react";
import { EpisodesList } from "../movie/EpisodesList";
import { TrailerControls } from "../movie/TrailerControls";

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
    <DialogContent className="max-w-3xl h-[90vh] p-0 bg-black overflow-y-auto">
      <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 z-50 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Return</span>
        </Button>
        <div className="relative pt-16">
          {trailerKey ? (
            <div className="relative">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <TrailerControls
                movie={movie}
                onPlayClick={onPlayClick}
                selectedSeason={selectedSeason}
                selectedEpisode={selectedEpisode}
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-white">No trailer available</p>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 pb-6">
        <h2 className="text-4xl font-bold text-white mt-2">{movie.title || movie.name}</h2>
        <p className="text-gray-400 mt-2 text-lg">{movie.overview}</p>

        {movie.media_type === "tv" &&
          movieDetails?.seasons &&
          seasonDetails?.episodes && (
            <div className="mt-6">
              <EpisodesList
                seasons={movieDetails.seasons}
                selectedSeason={selectedSeason}
                onSeasonChange={onSeasonChange}
                episodes={seasonDetails.episodes}
                onEpisodeSelect={onEpisodeSelect}
              />
            </div>
          )}
      </div>
    </DialogContent>
  );
};