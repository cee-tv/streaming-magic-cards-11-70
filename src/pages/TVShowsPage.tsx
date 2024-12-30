import { Navigation } from "@/components/Navigation";
import { TVShows } from "@/components/TVShows";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Plus, Check } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { VideoPlayer } from "@/components/movie/VideoPlayer";
import { EpisodesList } from "@/components/movie/EpisodesList";
import { TVShowHeader } from "@/components/tv/TVShowHeader";

const TVShowsPage = () => {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => tmdb.getTrending("tv"),
  });

  const { data: showDetails } = useQuery({
    queryKey: ["show", trending[currentShowIndex]?.id],
    queryFn: () => tmdb.getMovieDetails(trending[currentShowIndex]?.id, 'tv'),
    enabled: showModal || showPlayer,
  });

  const { data: seasonDetails } = useQuery({
    queryKey: ["season", trending[currentShowIndex]?.id, selectedSeason],
    queryFn: () => tmdb.getTVSeasonDetails(trending[currentShowIndex]?.id, selectedSeason),
    enabled: showModal && trending[currentShowIndex]?.media_type === 'tv',
  });

  const handleWatchlistToggle = () => {
    const show = trending[currentShowIndex];
    if (isInWatchlist(show.id)) {
      removeFromWatchlist(show.id);
      toast.success("Removed from watchlist");
    } else {
      addToWatchlist(show);
      toast.success("Added to watchlist");
    }
  };

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(parseInt(season));
    setSelectedEpisode(1);
  };

  const handleNextEpisode = () => {
    if (seasonDetails?.episodes) {
      if (selectedEpisode < seasonDetails.episodes.length) {
        setSelectedEpisode(selectedEpisode + 1);
      } else if (showDetails?.seasons && selectedSeason < showDetails.seasons.length) {
        setSelectedSeason(selectedSeason + 1);
        setSelectedEpisode(1);
      }
    }
  };

  const currentShow = trending[currentShowIndex];
  const trailerKey = showDetails?.videos ? tmdb.getTrailerKey(showDetails.videos) : null;
  const embedUrl = `https://embed.su/embed/tv/${currentShow?.id}/${selectedSeason}/${selectedEpisode}`;
  const multiEmbedUrl = `https://multiembed.mov/?video_id=${currentShow?.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`;

  if (!currentShow) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <TVShowHeader 
        show={currentShow}
        onModalOpen={() => {
          setShowModal(true);
          setIsPaused(true);
        }}
        onPlayStart={() => {
          setShowPlayer(true);
          setIsPaused(true);
        }}
        onPlayEnd={() => {
          setShowPlayer(false);
          setIsPaused(false);
        }}
      />
      <div className="pt-4">
        <TVShows />
      </div>

      {/* More Info Modal */}
      <Dialog open={showModal} onOpenChange={(open) => {
        setShowModal(open);
        setIsPaused(open);
      }}>
        <DialogContent className="max-w-3xl h-[90vh] p-0 bg-black overflow-y-auto">
          <DialogTitle className="sr-only">{currentShow.name}</DialogTitle>
          <DialogDescription className="sr-only">Details for {currentShow.name}</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => {
              setShowModal(false);
              setIsPaused(false);
            }}
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
                {isInWatchlist(currentShow.id) ? (
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
            <h2 className="text-2xl font-bold mb-4 text-white">{currentShow.name}</h2>
            <p className="text-gray-400">{currentShow.overview}</p>

            {showDetails?.seasons && seasonDetails?.episodes && (
              <EpisodesList
                seasons={showDetails.seasons}
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Player */}
      <VideoPlayer
        isOpen={showPlayer}
        onClose={() => {
          setShowPlayer(false);
          setIsPaused(false);
        }}
        title={currentShow.name}
        embedUrl={embedUrl}
        multiEmbedUrl={multiEmbedUrl}
        movieId={currentShow.id}
        mediaType="tv"
        season={selectedSeason}
        episode={selectedEpisode}
        onNextEpisode={handleNextEpisode}
      />
    </div>
  );
};

export default TVShowsPage;