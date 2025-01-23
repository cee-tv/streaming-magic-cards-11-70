import { Navigation } from "@/components/Navigation";
import { TVShows } from "@/components/TVShows";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/movie/VideoPlayer";
import { TVShowHeaderModal } from "@/components/tv/TVShowHeaderModal";
import { TVShowHeaderControls } from "@/components/tv/TVShowHeaderControls";

const TVShowsPage = () => {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => tmdb.getTrending("tv"),
  });

  useEffect(() => {
    if (trending.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentShowIndex((prev) => 
        prev === trending.length - 1 ? 0 : prev + 1
      );
    }, 10000); // Change poster every 10 seconds

    return () => clearInterval(interval);
  }, [trending.length, isPaused]);

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
      <div className="relative h-[50vh] md:h-[70vh] mb-8">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${currentShow.backdrop_path}`}
            alt={currentShow.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
        </div>
        <div className="absolute bottom-0 left-0 p-4 md:p-8 max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4">
            {currentShow.name}
          </h1>
          <p className="text-white/80 text-sm md:text-lg mb-4 line-clamp-3 md:line-clamp-none">
            {currentShow.overview}
          </p>
          <TVShowHeaderControls
            show={currentShow}
            onPlayClick={() => {
              setShowPlayer(true);
              setIsPaused(true);
            }}
            onMoreInfoClick={() => {
              setShowModal(true);
              setIsPaused(true);
            }}
          />
        </div>
      </div>
      <div className="pt-4">
        <TVShows />
      </div>

      <Dialog open={showModal} onOpenChange={(open) => {
        setShowModal(open);
        setIsPaused(open);
      }}>
        <TVShowHeaderModal
          show={currentShow}
          showModal={showModal}
          trailerKey={trailerKey}
          showDetails={showDetails}
          seasonDetails={seasonDetails}
          selectedSeason={selectedSeason}
          selectedEpisode={selectedEpisode}
          onClose={() => {
            setShowModal(false);
            setIsPaused(false);
          }}
          onPlayClick={() => {
            setShowModal(false);
            setShowPlayer(true);
          }}
          onSeasonChange={handleSeasonChange}
          onEpisodeSelect={(episodeNumber) => {
            setSelectedEpisode(episodeNumber);
            setShowModal(false);
            setShowPlayer(true);
          }}
        />
      </Dialog>

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