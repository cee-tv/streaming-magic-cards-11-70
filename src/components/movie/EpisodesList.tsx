import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MoreHorizontal, Play } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Episode {
  episode_number: number;
  name: string;
  overview: string;
  still_path: string | null;
}

interface Season {
  season_number: number;
}

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

      <div className="space-y-4">
        {episodes.map((episode) => (
          <div
            key={episode.episode_number}
            className="flex items-start gap-4 text-white"
          >
            <img
              src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : '/placeholder.svg'}
              alt={episode.name}
              className="w-40 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Episode {episode.episode_number}</h4>
                  <h5>{episode.name}</h5>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/20"
                    onClick={() => onEpisodeSelect(episode.episode_number)}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/20"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => onEpisodeSelect(episode.episode_number)}>
                        Play Episode
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`https://dl.vidsrc.vip/tv/${episode.episode_number}/${selectedSeason}/${episode.episode_number}`, '_blank')}>
                        Download Episode
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{episode.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};