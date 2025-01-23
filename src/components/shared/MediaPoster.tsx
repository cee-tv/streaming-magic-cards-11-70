import { Movie } from "@/services/tmdb";

interface MediaPosterProps {
  media: Movie;
}

export const MediaPoster = ({ media }: MediaPosterProps) => {
  return (
    <div className="absolute inset-0">
      <img
        src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
        alt={media.title || media.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/25 to-transparent" />
    </div>
  );
};