import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { ArrowLeft, Play, Plus, Check, Download } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { MovieButtons } from "./movie/MovieButtons";
import { VideoPlayer } from "./movie/VideoPlayer";
import { EpisodesList } from "./movie/EpisodesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SimilarContent } from "./movie/SimilarContent";
import { DetailsTabContent } from "./movie/DetailsTabContent";

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

  const { data: seasonDetails } = useQuery({
    queryKey: ["season", movie.id, selectedSeason],
    queryFn: () => tmdb.getTVSeasonDetails(movie.id, selectedSeason),
    enabled: showModal && movie.media_type === 'tv',
  });

  const { data: similarContent = [] } = useQuery({
    queryKey: ["similar", movie.id, movie.media_type],
    queryFn: () => tmdb.getSimilar(movie.id, movie.media_type as 'movie' | 'tv'),
    enabled: showModal,
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

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(parseInt(season));
    setSelectedEpisode(1);
  };

  const handleNextEpisode = () => {
    if (movie.media_type === 'tv' && seasonDetails?.episodes) {
      if (selectedEpisode < seasonDetails.episodes.length) {
        setSelectedEpisode(selectedEpisode + 1);
      } else if (movieDetails?.seasons && selectedSeason < movieDetails.seasons.length) {
        setSelectedSeason(selectedSeason + 1);
        setSelectedEpisode(1);
      }
    }
  };

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date 
    ? new Date(movie.first_air_date).getFullYear()
    : null;

  const votePercentage = Math.round(movie.vote_average * 10);

  return (
    <>
      <div className="relative group cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
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

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-full w-full h-[80vh] p-0 bg-black overflow-y-auto m-0">
          <DialogTitle className="sr-only">{movie.title || movie.name}</DialogTitle>
          <DialogDescription className="sr-only">Details for {movie.title || movie.name}</DialogDescription>
          <div className="relative">
            <div className="relative pt-16">
              {trailerKey ? (
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
                          size="icon"
                          className="rounded-full border-white hover:border-white bg-black/30 text-white"
                          onClick={handleWatchlistToggle}
                        >
                          {isInWatchlist(movie.id) ? (
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
                            const downloadUrl = movie.media_type === 'movie'
                              ? `https://dl.vidsrc.vip/movie/${movie.id}`
                              : `https://dl.vidsrc.vip/tv/${movie.id}/${selectedSeason}/${selectedEpisode}`;
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
                      <h2 className="text-2xl font-bold text-white">{movie.title || movie.name}</h2>
                      {releaseYear && <span className="text-gray-400">({releaseYear})</span>}
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-green-500 font-bold">{votePercentage}% Match</span>
                      {movieDetails?.runtime && (
                        <span className="text-gray-400">{movieDetails.runtime} min</span>
                      )}
                      {movieDetails?.genres?.map((genre: { id: number; name: string }) => (
                        <span key={genre.id} className="text-gray-400">{genre.name}</span>
                      ))}
                    </div>
                    <p className="text-gray-400">{movie.overview}</p>
                    {movieDetails?.tagline && (
                      <p className="text-gray-500 mt-2 italic">{movieDetails.tagline}</p>
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
            <Tabs defaultValue={movie.media_type === 'tv' ? "episodes" : "more"} className="w-full">
              <TabsList className="bg-white/10 text-white w-full h-14 text-lg">
                {movie.media_type === 'tv' && (
                  <TabsTrigger value="episodes" className="data-[state=active]:bg-white/20 flex-1 h-full">
                    Episodes
                  </TabsTrigger>
                )}
                <TabsTrigger value="more" className="data-[state=active]:bg-white/20 flex-1 h-full">
                  More Like This
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-white/20 flex-1 h-full">
                  Details
                </TabsTrigger>
              </TabsList>
              {movie.media_type === 'tv' && (
                <TabsContent value="episodes">
                  {movieDetails?.seasons && seasonDetails?.episodes && (
                    <EpisodesList
                      seasons={movieDetails.seasons}
                      selectedSeason={selectedSeason}
                      onSeasonChange={handleSeasonChange}
                      episodes={seasonDetails.episodes}
                      onEpisodeSelect={(episodeNumber) => {
                        setSelectedEpisode(episodeNumber);
                        setShowModal(false);
                        setShowPlayer(true);
                      }}
                    />
                  )}
                </TabsContent>
              )}
              <TabsContent value="more">
                <SimilarContent similarContent={similarContent} />
              </TabsContent>
              <TabsContent value="details">
                <DetailsTabContent 
                  details={movieDetails}
                  releaseYear={releaseYear}
                  votePercentage={votePercentage}
                />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

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
        onNextEpisode={movie.media_type === 'tv' ? handleNextEpisode : undefined}
      />
    </>
  );
};
