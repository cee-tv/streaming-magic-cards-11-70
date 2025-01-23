import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { X, Play, Download, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { EpisodesList } from "../movie/EpisodesList";
import { getVideoConfig } from "@/utils/videoConfig";

interface MediaModalContentProps {
  media: Movie;
  showModal: boolean;
  trailerKey: string | null;
  mediaDetails: any;
  seasonDetails?: any;
  selectedSeason?: number;
  selectedEpisode?: number;
  onClose: () => void;
  onPlayClick: () => void;
  onSeasonChange?: (season: string) => void;
  onEpisodeSelect?: (episodeNumber: number) => void;
}

export const MediaModalContent = ({
  media,
  showModal,
  trailerKey,
  mediaDetails,
  seasonDetails,
  selectedSeason,
  selectedEpisode,
  onClose,
  onPlayClick,
  onSeasonChange,
  onEpisodeSelect,
}: MediaModalContentProps) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const videoConfig = getVideoConfig();

  const handleWatchlistToggle = () => {
    if (isInWatchlist(media.id)) {
      removeFromWatchlist(media.id);
      toast.success("Removed from watchlist");
    } else {
      addToWatchlist(media);
      toast.success("Added to watchlist");
    }
  };

  const releaseYear = media.release_date 
    ? new Date(media.release_date).getFullYear()
    : media.first_air_date 
    ? new Date(media.first_air_date).getFullYear()
    : null;

  const votePercentage = Math.round(media.vote_average * 10);

  return (
    <DialogContent className="max-w-3xl h-[45vh] p-0 bg-black overflow-y-auto">
      <DialogTitle className="sr-only">{media.title || media.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {media.title || media.name}</DialogDescription>
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
        <div className="relative pt-16">
          {trailerKey ? (
            <>
              <div className="relative">
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${trailerKey}?${new URLSearchParams(videoConfig.playerVars as any).toString()}`}
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
                      {isInWatchlist(media.id) ? (
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
                        const downloadUrl = media.media_type === 'movie'
                          ? `https://dl.vidsrc.vip/movie/${media.id}`
                          : `https://dl.vidsrc.vip/tv/${media.id}/${selectedSeason}/${selectedEpisode}`;
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
                  <h2 className="text-2xl font-bold text-white">{media.title || media.name}</h2>
                  {releaseYear && <span className="text-gray-400">({releaseYear})</span>}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-green-500 font-bold">{votePercentage}% Match</span>
                  {mediaDetails?.runtime && (
                    <span className="text-gray-400">{mediaDetails.runtime} min</span>
                  )}
                  {mediaDetails?.genres?.map((genre: { id: number; name: string }) => (
                    <span key={genre.id} className="text-gray-400">{genre.name}</span>
                  ))}
                </div>
                <p className="text-gray-400">{media.overview}</p>
                {mediaDetails?.tagline && (
                  <p className="text-gray-500 mt-2 italic">{mediaDetails.tagline}</p>
                )}
              </div>
            </>
          ) : (
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-white">No trailer available</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        {media.media_type === 'tv' && mediaDetails?.seasons && seasonDetails?.episodes && (
          <EpisodesList
            seasons={mediaDetails.seasons}
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