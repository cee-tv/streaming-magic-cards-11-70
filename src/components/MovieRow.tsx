import { Movie } from "@/services/tmdb";
import { MovieCard } from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!rowRef.current) return;

      const cards = rowRef.current.querySelectorAll('.movie-card');
      const currentIndex = focusedIndex;
      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          newIndex = Math.min(currentIndex + 1, cards.length - 1);
          if (newIndex > currentIndex) {
            const card = cards[newIndex] as HTMLElement;
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = Math.max(currentIndex - 1, 0);
          if (newIndex < currentIndex) {
            const card = cards[newIndex] as HTMLElement;
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Find the previous row's cards
          const prevRow = rowRef.current.parentElement?.previousElementSibling?.querySelector('[role="row"]');
          if (prevRow) {
            const prevCards = prevRow.querySelectorAll('.movie-card');
            if (prevCards[currentIndex]) {
              (prevCards[currentIndex] as HTMLElement).focus();
            }
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          // Find the next row's cards
          const nextRow = rowRef.current.parentElement?.nextElementSibling?.querySelector('[role="row"]');
          if (nextRow) {
            const nextCards = nextRow.querySelectorAll('.movie-card');
            if (nextCards[currentIndex]) {
              (nextCards[currentIndex] as HTMLElement).focus();
            }
          }
          break;
      }

      setFocusedIndex(newIndex);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex]);

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
        className="flex overflow-x-auto scrollbar-hide gap-4 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="flex-none w-[160px] md:w-[200px] lg:w-[240px] scroll-snap-align-start movie-card"
            style={{ scrollSnapAlign: "start" }}
            tabIndex={0}
            onFocus={() => setFocusedIndex(index)}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};