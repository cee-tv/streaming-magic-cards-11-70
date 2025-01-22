import { Play } from "lucide-react";

interface TrailerPlayerProps {
  trailerKey: string | null;
}

export const TrailerPlayer = ({ trailerKey }: TrailerPlayerProps) => {
  return (
    <div className="relative pt-16">
      {trailerKey ? (
        <div className="relative group">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-full">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
          <p className="text-white">No trailer available</p>
        </div>
      )}
    </div>
  );
};