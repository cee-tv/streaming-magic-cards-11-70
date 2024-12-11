import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { ArrowLeft, Play, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { MovieButtons } from "./movie/MovieButtons";
import { VideoPlayer } from "./movie/VideoPlayer";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data: movieDetails } = useQuery({
    queryKey: ["movie", movie.id, movie.media_type],
    queryFn: () => tmdb.getMovieDetails(movie.id, movie.media_type as 'movie' | 'tv'),
    enabled: showModal || showPlayer,
  });

  const trailerKey = movieDetails?.videos ? tmdb.getTrailerKey(movieDetails.videos) : null;
  const embedUrl = movie.media_type === 'movie' 
    ? `https://embed.su/embed/movie/${movie.id}`
    : `https://embed.su/embed/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`;
  const multiEmbedUrl = movie.media_type === 'movie'
    ? `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`
    : `https://multiembed.mov/?video_id=${movie.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`;

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
    <>
      <div className="relative group cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
          <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4">
            <h3 className="text-white font-bold text-xs md:text-sm line-clamp-2">
              {movie.title || movie.name}
            </h3>
            <MovieButtons
              movie={movie}
              onPlay={() => setShowPlayer(true)}
              onMoreInfo={() => setShowModal(true)}
              onWatchlistToggle={handleWatchlistToggle}
              isInWatchlist={isInWatchlist(movie.id)}
            />
          </div>
        </div>
      </div>

      {/* More Info Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl h-[70vh] p-0 bg-black overflow-y-auto">
          <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
          <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setShowModal(false)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Return</span>
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
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Seasons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movieDetails.seasons.map((season) => (
                    <div key={season.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex gap-4">
                        {season.poster_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                            alt={season.name}
                            className="w-24 h-36 object-cover rounded"
                          />
                        )}
                        <div>
                          <h4 className="text-white font-semibold">{season.name}</h4>
                          <p className="text-gray-400 text-sm">{season.episode_count} episodes</p>
                          <Button
                            variant="ghost"
                            className="mt-2 text-white hover:bg-white/10"
                            onClick={() => {
                              setSelectedSeason(season.season_number);
                              setSelectedEpisode(1);
                              setShowModal(false);
                              setShowPlayer(true);
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Play
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Player */}
      <VideoPlayer
        isOpen={showPlayer}
        onClose={() => setShowPlayer(false)}
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
