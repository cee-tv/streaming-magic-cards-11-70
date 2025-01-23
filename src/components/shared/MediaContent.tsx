import { Movie } from "@/services/tmdb";

interface MediaContentProps {
  media: Movie;
  children: React.ReactNode;
}

export const MediaContent = ({ media, children }: MediaContentProps) => {
  return (
    <div className="absolute bottom-0 left-0 p-4 md:p-8 max-w-2xl">
      <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4">
        {media.title || media.name}
      </h1>
      <p className="text-white/80 text-sm md:text-lg mb-4 line-clamp-3 md:line-clamp-none">
        {media.overview}
      </p>
      {children}
    </div>
  );
};