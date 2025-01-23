import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { X, Play, Download, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { EpisodesList } from "../movie/EpisodesList";

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
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleWatchlistToggle = () => {
    if (isInWatchlist(show.id)) {
      removeFromWatchlist(show.id);
      toast.success("Removed from watchlist");
    } else {
      addToWatchlist(show);
      toast.success("Added to watchlist");
    }
  };

  const releaseYear = show.first_air_date 
    ? new Date(show.first_air_date).getFullYear()
    : null;

  const votePercentage = Math.round(show.vote_average * 10);

  return (
    <DialogContent className="max-w-3xl h-[45vh] p-0 bg-black overflow-y-auto">
      <DialogTitle className="sr-only">{show.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {show.name}</DialogDescription>
      <div className="relative pt-14">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white hover:bg-white/20 h-12 w-12"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
        {trailerKey ? (
          <>
            <div className="relative">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-4">
                  <Button 
                    className="rounded-full bg-white hover:bg-white/90 text-black"
                    onClick={onPlayClick}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white hover:border-white bg-black/30 text-white"
                    onClick={handleWatchlistToggle}
                  >
                    {isInWatchlist(show.id) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white hover:border-white bg-black/30 text-white"
                    onClick={() => {
                      const downloadUrl = `https://dl.vidsrc.vip/tv/${show.id}/${selectedSeason}/${selectedEpisode}`;
                      window.open(downloadUrl, '_blank');
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-black p-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-white">{show.name}</h2>
                {releaseYear && <span className="text-gray-400">({releaseYear})</span>}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-green-500 font-bold">{votePercentage}% Match</span>
                {showDetails?.genres?.map((genre: { id: number; name: string }) => (
                  <span key={genre.id} className="text-gray-400">{genre.name}</span>
                ))}
              </div>
              <p className="text-gray-400">{show.overview}</p>
              {showDetails?.tagline && (
                <p className="text-gray-500 mt-2 italic">{showDetails.tagline}</p>
              )}
            </div>
          </>
        ) : (
          <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
            <p className="text-white">No trailer available</p>
          </div>
        )}
      </div>
      <div className="p-4">
        {showDetails?.seasons && seasonDetails?.episodes && (
          <EpisodesList
            seasons={showDetails.seasons}
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