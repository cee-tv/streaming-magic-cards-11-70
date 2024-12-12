import { Episode, Season } from "@/services/tmdb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface EpisodesListProps {
  seasons: Season[];
  selectedSeason: number;
  onSeasonChange: (value: string) => void;
  episodes: Episode[];
}

export const EpisodesList = ({ 
  seasons, 
  selectedSeason, 
  onSeasonChange,
  episodes 
}: EpisodesListProps) => {
  return (
    <div className="bg-black text-white min-h-[70vh]">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Episodes</h2>
          <Select value={selectedSeason.toString()} onValueChange={onSeasonChange}>
            <SelectTrigger className="w-[180px] bg-zinc-800 border-none text-white">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              {seasons.map((season) => (
                <SelectItem 
                  key={season.id} 
                  value={season.season_number.toString()}
                  className="hover:bg-zinc-700 focus:bg-zinc-700"
                >
                  Season {season.season_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {episodes.map((episode) => (
            <div key={episode.id} className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                  alt={episode.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{episode.name}</h3>
                  <span className="text-gray-400">{episode.runtime}m</span>
                </div>
                <p className="text-gray-400 mt-2">{episode.overview}</p>
              </div>
              <hr className="border-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};