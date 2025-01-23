import { Movie } from "@/services/tmdb";
import { MovieCard } from "../MovieCard";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SimilarContentProps {
  similarContent: Movie[];
}

export const SimilarContent = ({ similarContent }: SimilarContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayCount = isExpanded ? similarContent.length : 5;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {similarContent.slice(0, displayCount).map((item) => (
          <div key={item.id} className="w-full">
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
      {similarContent.length > 5 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};