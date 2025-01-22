import { Episode, Season } from "@/services/tmdb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

interface EpisodesListProps {
  seasons: Season[];
  selectedSeason: number;
  onSeasonChange: (season: string) => void;
  episodes: Episode[];
  onEpisodeSelect: (episodeNumber: number) => void;
}

export const EpisodesList = ({
  seasons,
  selectedSeason,
  onSeasonChange,
  episodes,
  onEpisodeSelect,
}: EpisodesListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedEpisodes = isExpanded ? episodes : episodes.slice(0, 3);

  return (
    <div className="space-y-4">
      <Select
        value={selectedSeason.toString()}
        onValueChange={onSeasonChange}
      >
        <SelectTrigger className="w-[180px] bg-white/10 text-white border-white/20">
          <SelectValue placeholder="Select season" />
        </SelectTrigger>
        <SelectContent>
          {seasons.map((season) => (
            <SelectItem
              key={season.season_number}
              value={season.season_number.toString()}
            >
              Season {season.season_number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2">
        {displayedEpisodes.map((episode) => (
          <div
            key={episode.episode_number}
            className="flex items-center gap-4 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
            onClick={() => onEpisodeSelect(episode.episode_number)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w185${episode.still_path}`}
              alt={episode.name}
              className="w-32 h-20 object-cover rounded"
            />
            <div>
              <h4 className="font-bold text-white">
                {episode.episode_number}. {episode.name}
              </h4>
              <p className="text-sm text-gray-400 line-clamp-2">
                {episode.overview}
              </p>
            </div>
          </div>
        ))}
      </div>

      {episodes.length > 3 && (
        <Button
          variant="ghost"
          className="w-full text-white hover:bg-white/10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
};