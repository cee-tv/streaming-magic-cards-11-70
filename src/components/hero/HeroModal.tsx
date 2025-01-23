import { Movie } from "@/services/tmdb";
import { Button } from "../ui/button";
import { DialogContent } from "../ui/dialog";
import { Play, Plus, Check, Download } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MovieCard } from "../MovieCard";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";

interface HeroModalProps {
  movie: Movie;
  trailerKey: string | null;
  onClose: () => void;
  onPlayClick: () => void;
}

export const HeroModal = ({
  movie,
  trailerKey,
  onClose,
  onPlayClick,
}: HeroModalProps) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data: similarMovies = [] } = useQuery({
    queryKey: ["similar", movie.id],
    queryFn: () => tmdb.getSimilar(movie.id, movie.media_type || 'movie'),
    enabled: true,
  });

  const handleWatchlistToggle = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      toast.success("Removed from watchlist");
    } else {
      addToWatchlist(movie);
      toast.success("Added to watchlist");
    }
  };

  return (
    <DialogContent className="max-w-full w-full h-screen p-0 bg-black overflow-y-auto m-0">
      <div className="relative">
        {/* Video player and controls section */}
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          {trailerKey ? (
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p className="text-white">No trailer available</p>
          )}
        </div>
        
        <div className="p-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-white/10 text-white w-full h-12">
              <TabsTrigger value="details" className="data-[state=active]:bg-white/20 flex-1 h-full text-lg">
                Details
              </TabsTrigger>
              <TabsTrigger value="more" className="data-[state=active]:bg-white/20 flex-1 h-full text-lg">
                More Like This
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">{movie.title || movie.name}</h2>
                <p className="text-gray-400">{movie.overview}</p>
              </div>
            </TabsContent>
            <TabsContent value="more" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {similarMovies.map((similarMovie) => (
                  <div key={similarMovie.id} className="w-full">
                    <MovieCard movie={similarMovie} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DialogContent>
  );
};
