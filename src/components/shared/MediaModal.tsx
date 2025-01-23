import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Play, Download, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MovieCard } from "../MovieCard";
import { EpisodesList } from "../movie/EpisodesList";

interface MediaModalProps {
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

export const MediaModal = ({
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
}: MediaModalProps) => {
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
    <DialogContent className="max-w-full w-full h-screen p-0 bg-black overflow-y-auto m-0">
      <DialogTitle className="sr-only">{media.title || media.name}</DialogTitle>
      <DialogDescription className="sr-only">Details for {media.title || media.name}</DialogDescription>
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
        <Tabs defaultValue={media.media_type === 'tv' ? 'episodes' : 'more'} className="w-full">
          <TabsList className="bg-white/10 text-white w-full h-14 text-lg">
            {media.media_type === 'tv' && (
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
          {media.media_type === 'tv' && (
            <TabsContent value="episodes">
              {mediaDetails?.seasons && seasonDetails?.episodes && onSeasonChange && onEpisodeSelect && (
                <EpisodesList
                  seasons={mediaDetails.seasons}
                  selectedSeason={selectedSeason || 1}
                  onSeasonChange={onSeasonChange}
                  episodes={seasonDetails.episodes}
                  onEpisodeSelect={onEpisodeSelect}
                />
              )}
            </TabsContent>
          )}
          <TabsContent value="more">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
              {mediaDetails?.similar?.results?.map((similarMedia: Movie) => (
                <MovieCard key={similarMedia.id} movie={similarMedia} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="details" className="text-white space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Information</h3>
                <div className="space-y-2">
                  {releaseYear && (
                    <p><span className="text-gray-400">Release Year:</span> {releaseYear}</p>
                  )}
                  <p><span className="text-gray-400">Rating:</span> {votePercentage}%</p>
                  {mediaDetails?.status && (
                    <p><span className="text-gray-400">Status:</span> {mediaDetails.status}</p>
                  )}
                  {mediaDetails?.runtime && (
                    <p><span className="text-gray-400">Runtime:</span> {mediaDetails.runtime} minutes</p>
                  )}
                  {mediaDetails?.number_of_seasons && (
                    <p><span className="text-gray-400">Seasons:</span> {mediaDetails.number_of_seasons}</p>
                  )}
                  {mediaDetails?.number_of_episodes && (
                    <p><span className="text-gray-400">Episodes:</span> {mediaDetails.number_of_episodes}</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
                <div className="space-y-2">
                  {mediaDetails?.genres && (
                    <p>
                      <span className="text-gray-400">Genres:</span>{' '}
                      {mediaDetails.genres.map((genre: any) => genre.name).join(', ')}
                    </p>
                  )}
                  {mediaDetails?.networks && mediaDetails.networks.length > 0 && (
                    <p>
                      <span className="text-gray-400">Networks:</span>{' '}
                      {mediaDetails.networks.map((network: any) => network.name).join(', ')}
                    </p>
                  )}
                  {mediaDetails?.production_companies && mediaDetails.production_companies.length > 0 && (
                    <p>
                      <span className="text-gray-400">Production:</span>{' '}
                      {mediaDetails.production_companies.map((company: any) => company.name).join(', ')}
                    </p>
                  )}
                  {mediaDetails?.original_language && (
                    <p>
                      <span className="text-gray-400">Original Language:</span>{' '}
                      {mediaDetails.original_language.toUpperCase()}
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