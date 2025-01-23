import { Movie } from "@/services/tmdb";
import { MovieCard } from "../MovieCard";

interface SimilarContentProps {
  similarContent: Movie[];
}

export const SimilarContent = ({ similarContent }: SimilarContentProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
      {similarContent.map((item) => (
        <div key={item.id} className="w-full">
          <MovieCard movie={item} />
        </div>
      ))}
    </div>
  );
};