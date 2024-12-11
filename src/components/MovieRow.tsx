import { Movie } from "@/services/tmdb";
import { MovieCard } from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const isMobile = useIsMobile();

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-8 relative group">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">{title}</h2>
      
      {/* Navigation Arrows - Desktop Only */}
      {!isMobile && (
        <>
          {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 z-10 bg-black/50 p-2 rounded-full transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}
          {showRightArrow && (
            <button
              className="absolute right-0 top-1/2 z-10 bg-black/50 p-2 rounded-full transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </>
      )}

      {/* Scrollable Container */}
      <div
        ref={rowRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide gap-4 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-[160px] md:w-[200px] lg:w-[240px] scroll-snap-align-start"
            style={{ scrollSnapAlign: "start" }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};