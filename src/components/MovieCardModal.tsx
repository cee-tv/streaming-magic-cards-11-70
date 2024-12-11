import { Movie } from "@/services/tmdb";
import { Play, Check, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { SeasonList } from "./SeasonList";
import { useState } from "react";

interface MovieCardModalProps {
  movie: Movie;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setShowPlayer: (show: boolean) => void;
  handleWatchlistToggle: () => void;
  isInWatchlist: (id: number) => boolean;
}

export const MovieCardModal = ({ 
  movie, 
  showModal, 
  setShowModal, 
  setShowPlayer, 
  handleWatchlistToggle,
  isInWatchlist 
}: MovieCardModalProps) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: movieDetails } = useQuery({
    queryKey: ["movie", movie.id, movie.media_type],
    queryFn: () => tmdb.getMovieDetails(movie.id, movie.media_type as 'movie' | 'tv'),
    enabled: showModal,
  });

  const trailerKey = movieDetails?.videos ? tmdb.getTrailerKey(movieDetails.videos) : null;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-3xl h-[70vh] p-0 bg-black overflow-y-auto">
        <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
        <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
          onClick={() => setShowModal(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        {trailerKey ? (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
            <p className="text-white">No trailer available</p>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              className="rounded-full bg-white hover:bg-white/90 text-black"
              onClick={() => {
                setShowModal(false);
                setShowPlayer(true);
              }}
            >
              <Play className="h-4 w-4 mr-2" />
              Play
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white hover:border-white bg-black/30 text-white"
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist(movie.id) ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Remove from Watchlist
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Watchlist
                </>
              )}
            </Button>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">{movie.title || movie.name}</h2>
          <p className="text-gray-400 mb-6">{movie.overview}</p>

          {movie.media_type === 'tv' && movieDetails?.seasons && (
            <SeasonList 
              tvShowId={movie.id} 
              seasons={movieDetails.seasons}
              setShowModal={setShowModal}
              setShowPlayer={setShowPlayer}
              onEpisodeSelect={(season, episode) => {
                setSelectedSeason(season);
                setSelectedEpisode(episode);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};