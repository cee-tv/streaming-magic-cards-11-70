import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Play, Download, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { EpisodesList } from "../movie/EpisodesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MovieCard } from "../MovieCard";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

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

  const { data: similarShows = [] } = useQuery({
    queryKey: ["similar", show.id],
    queryFn: () => tmdb.getSimilar(show.id, "tv"),
    enabled: showModal,
  });

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
    <DialogContent className="max-w-full w-full h-screen p-0 bg-black overflow-y-auto m-0">
      <DialogTitle className="sr-only">{show.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {show.name}</DialogDescription>
      <div className="relative">
        <div className="relative pt-16">
          {trailerKey ? (
            <div className="relative">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0`}
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
          ) : (
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-white">No trailer available</p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-black p-4">
        <h2 className="text-2xl font-bold mb-2 text-white">{show.name}</h2>
        <p className="text-gray-400">{show.overview}</p>
      </div>
      <div className="p-4">
        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="bg-white/10 text-white w-full h-14 text-lg">
            <TabsTrigger value="episodes" className="data-[state=active]:bg-white/20 flex-1 h-full">Episodes</TabsTrigger>
            <TabsTrigger value="more" className="data-[state=active]:bg-white/20 flex-1 h-full">More Like This</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-white/20 flex-1 h-full">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="episodes">
            {showDetails?.seasons && seasonDetails?.episodes && (
              <EpisodesList
                seasons={showDetails.seasons}
                selectedSeason={selectedSeason}
                onSeasonChange={onSeasonChange}
                episodes={seasonDetails.episodes}
                onEpisodeSelect={onEpisodeSelect}
              />
            )}
          </TabsContent>
          <TabsContent value="more">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
              {similarShows.map((movie) => (
                <div key={movie.id} className="w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="details" className="text-white space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Show Information</h3>
                <div className="space-y-2">
                  {releaseYear && (
                    <p><span className="text-gray-400">Release Year:</span> {releaseYear}</p>
                  )}
                  <p><span className="text-gray-400">Rating:</span> {votePercentage}%</p>
                  {showDetails?.status && (
                    <p><span className="text-gray-400">Status:</span> {showDetails.status}</p>
                  )}
                  {showDetails?.number_of_seasons && (
                    <p><span className="text-gray-400">Seasons:</span> {showDetails.number_of_seasons}</p>
                  )}
                  {showDetails?.number_of_episodes && (
                    <p><span className="text-gray-400">Episodes:</span> {showDetails.number_of_episodes}</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
                <div className="space-y-2">
                  {showDetails?.genres && (
                    <p>
                      <span className="text-gray-400">Genres:</span>{' '}
                      {showDetails.genres.map((genre: any) => genre.name).join(', ')}
                    </p>
                  )}
                  {showDetails?.networks && showDetails.networks.length > 0 && (
                    <p>
                      <span className="text-gray-400">Networks:</span>{' '}
                      {showDetails.networks.map((network: any) => network.name).join(', ')}
                    </p>
                  )}
                  {showDetails?.production_companies && showDetails.production_companies.length > 0 && (
                    <p>
                      <span className="text-gray-400">Production:</span>{' '}
                      {showDetails.production_companies.map((company: any) => company.name).join(', ')}
                    </p>
                  )}
                  {showDetails?.original_language && (
                    <p>
                      <span className="text-gray-400">Original Language:</span>{' '}
                      {showDetails.original_language.toUpperCase()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  );
};