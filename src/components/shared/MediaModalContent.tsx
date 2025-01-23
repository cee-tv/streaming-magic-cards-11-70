import { Movie, MovieDetails } from "@/services/tmdb";
import { Button } from "../ui/button";
import { Play, Plus, Check, Download } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";

interface MediaModalContentProps {
  media: MovieDetails;
  trailerKey: string | null;
  selectedSeason?: number;
  selectedEpisode?: number;
  onPlayClick: () => void;
}

export const MediaModalContent = ({ 
  media, 
  trailerKey, 
  selectedSeason = 1,
  selectedEpisode = 1,
  onPlayClick 
}: MediaModalContentProps) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

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
    <>
      <div className="relative">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
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
          {media.runtime && (
            <span className="text-gray-400">{media.runtime} min</span>
          )}
          {media.genres?.map((genre) => (
            <span key={genre.id} className="text-gray-400">{genre.name}</span>
          ))}
        </div>
        <p className="text-gray-400">{media.overview}</p>
        {media.tagline && (
          <p className="text-gray-500 mt-2 italic">{media.tagline}</p>
        )}
      </div>
    </>
  );
};