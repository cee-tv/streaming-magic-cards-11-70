import { Movie } from "@/services/tmdb";

interface HeroControlsProps {
  movie: Movie;
  onPlayClick: () => void;
  onMoreInfoClick: () => void;
}

export const HeroControls = ({ movie, onPlayClick, onMoreInfoClick }: HeroControlsProps) => {
  return (
    <div className="flex gap-2 md:gap-4">
      <button 
        className="bg-white text-netflix-black px-4 md:px-6 py-2 rounded-md font-bold hover:bg-white/80 transition text-sm md:text-base"
        onClick={onPlayClick}
      >
        ▶ Play
      </button>
      <button 
        className="bg-gray-500/50 text-white px-4 md:px-6 py-2 rounded-md font-bold hover:bg-gray-500/70 transition text-sm md:text-base"
        onClick={onMoreInfoClick}
      >
        ℹ More Info
      </button>
    </div>
  );
};