import { Season } from "@/services/tmdb";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useState } from "react";

interface SeasonListProps {
  tvShowId: number;
  seasons: Season[];
  setShowModal: (show: boolean) => void;
  setShowPlayer: (show: boolean) => void;
}

export const SeasonList = ({ tvShowId, seasons, setShowModal, setShowPlayer }: SeasonListProps) => {
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: seasonDetails } = useQuery({
    queryKey: ["season", tvShowId, expandedSeason],
    queryFn: () => expandedSeason !== null ? tmdb.getSeasonDetails(tvShowId, expandedSeason) : null,
    enabled: expandedSeason !== null,
  });

  const handleEpisodePlay = (seasonNumber: number, episodeNumber: number) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(episodeNumber);
    setShowModal(false);
    setShowPlayer(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Seasons</h3>
      <div className="space-y-4">
        {seasons.map((season) => (
          <div key={season.id} className="bg-gray-900 rounded-lg p-4">
            <div className="flex gap-4">
              {season.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                  alt={season.name}
                  className="w-24 h-36 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h4 className="text-white font-semibold">{season.name}</h4>
                <p className="text-gray-400 text-sm">{season.episode_count} episodes</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={() => {
                      if (expandedSeason === season.season_number) {
                        setExpandedSeason(null);
                      } else {
                        setExpandedSeason(season.season_number);
                      }
                    }}
                  >
                    {expandedSeason === season.season_number ? 'Hide Episodes' : 'Show Episodes'}
                  </Button>
                </div>
              </div>
            </div>
            
            {expandedSeason === season.season_number && seasonDetails && (
              <div className="mt-4 space-y-2">
                {seasonDetails.episodes.map((episode) => (
                  <div key={episode.id} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded">
                    <div>
                      <h5 className="text-white text-sm font-medium">
                        {episode.episode_number}. {episode.name}
                      </h5>
                      <p className="text-gray-400 text-xs line-clamp-1">{episode.overview}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10"
                      onClick={() => handleEpisodePlay(season.season_number, episode.episode_number)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};