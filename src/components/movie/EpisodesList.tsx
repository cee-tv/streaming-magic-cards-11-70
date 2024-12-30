import { Episode, Season } from "@/services/tmdb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
    <div className="p-6 bg-black text-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Episodes</h2>
        <Select value={selectedSeason.toString()} onValueChange={onSeasonChange}>
          <SelectTrigger className="w-[180px] bg-zinc-800 border-none text-white">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-none text-white">
            {seasons.map((season) => (
              <SelectItem 
                key={season.season_number} 
                value={season.season_number.toString()}
                className="hover:bg-zinc-700"
              >
                Season {season.season_number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="flex gap-4 cursor-pointer hover:bg-zinc-800/50 p-4 rounded-lg transition-colors"
            onClick={() => onEpisodeSelect(episode.episode_number)}
          >
            {episode.still_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                alt={episode.name}
                className="w-40 h-24 object-cover rounded-md"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold">{episode.name}</h3>
                <span className="text-sm text-gray-400">{episode.runtime}m</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">{episode.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};