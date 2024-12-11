import { Movie } from "@/services/tmdb";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative group cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-md transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
        <div className="absolute bottom-0 p-4">
          <h3 className="text-white font-bold">{movie.title}</h3>
          <p className="text-white/80 text-sm mt-1">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};