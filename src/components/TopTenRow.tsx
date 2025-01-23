import { Movie } from "@/services/tmdb";
import { MovieCard } from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopTenRowProps {
  title: string;
  movies: Movie[];
}

export const TopTenRow = ({ title, movies }: TopTenRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(-1);
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
        role="row"
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide gap-2 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="relative flex-none w-[200px] md:w-[240px] lg:w-[280px] scroll-snap-align-start movie-card pl-[30px]"
            style={{ scrollSnapAlign: "start" }}
            tabIndex={0}
            onFocus={() => setFocusedIndex(index)}
          >
            <div 
              className="absolute left-0 top-0 bottom-0 flex items-center z-10"
              style={{
                WebkitTextStroke: '2px #595959',
                WebkitTextFillColor: 'transparent'
              }}
            >
              <span className="text-[120px] font-bold leading-none">
                {index + 1}
              </span>
            </div>
            <div className="relative z-20">
              <MovieCard movie={movie} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};