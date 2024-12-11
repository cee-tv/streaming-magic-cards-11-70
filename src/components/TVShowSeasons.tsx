import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { MovieDetails } from "@/types/movie";

interface TVShowSeasonsProps {
  movieDetails: MovieDetails;
  onSeasonSelect: (seasonNumber: number, episodeNumber: number) => void;
}

export const TVShowSeasons = ({ movieDetails, onSeasonSelect }: TVShowSeasonsProps) => {
  if (!movieDetails.seasons) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Seasons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movieDetails.seasons.map((season) => (
          <div key={season.id} className="bg-gray-900 rounded-lg p-4">
            <div className="flex gap-4">
              {season.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                  alt={season.name}
                  className="w-24 h-36 object-cover rounded"
                />
              )}
              <div>
                <h4 className="text-white font-semibold">{season.name}</h4>
                <p className="text-gray-400 text-sm">{season.episode_count} episodes</p>
                <Button
                  variant="ghost"
                  className="mt-2 text-white hover:bg-white/10"
                  onClick={() => onSeasonSelect(season.season_number, 1)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};