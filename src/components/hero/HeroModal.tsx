import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { ArrowLeft, Play, Download, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { EpisodesList } from "../movie/EpisodesList";

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
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleWatchlistToggle = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast.success("Removed from watchlist");
    } else {
      addToWatchlist(movie);
      toast.success("Added to watchlist");
    }
  };

  return (
    <DialogContent className="max-w-3xl h-[90vh] p-0 bg-black overflow-y-auto">
      <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Return</span>
        </Button>
        <div className="relative">
          {trailerKey ? (
            <>
              <div className="relative">
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${trailerKey}?modestbranding=1&showinfo=0&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="bg-black p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Button 
                    className="rounded-md bg-white hover:bg-white/90 text-black px-8"
                    onClick={onPlayClick}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/20 hover:border-white bg-white/10 text-white"
                    onClick={handleWatchlistToggle}
                  >
                    {isInWatchlist(movie.id) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">{movie.title || movie.name}</h2>
                <div className="flex items-center gap-3 text-sm mb-4">
                  <span className="text-green-500 font-medium">
                    {movieDetails?.vote_average ? `${Math.round(movieDetails.vote_average * 10)}% Match` : ''}
                  </span>
                  <span className="text-white/70">
                    {movieDetails?.release_date?.split('-')[0] || movieDetails?.first_air_date?.split('-')[0]}
                  </span>
                  <span className="px-1 py-0.5 text-xs border border-white/20 text-white/70 rounded">
                    {movieDetails?.original_language?.toUpperCase() || 'EN'}
                  </span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-6">{movie.overview}</p>
                <div className="text-sm text-white/70">
                  <span className="text-white/50">Genres: </span>
                  {movieDetails?.genres?.map((genre: any) => genre.name).join(', ')}
                </div>
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