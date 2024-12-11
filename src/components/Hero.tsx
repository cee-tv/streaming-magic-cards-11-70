import { Movie } from "@/services/tmdb";

interface HeroProps {
  movie: Movie;
}

export const Hero = ({ movie }: HeroProps) => {
  return (
    <div className="relative h-[50vh] md:h-[70vh] mb-8">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {movie.title}
        </h1>
        <p className="text-white/80 text-lg mb-4">{movie.overview}</p>
        <div className="flex gap-4">
          <button className="bg-white text-netflix-black px-6 py-2 rounded-md font-bold hover:bg-white/80 transition">
            ▶ Play
          </button>
          <button className="bg-gray-500/50 text-white px-6 py-2 rounded-md font-bold hover:bg-gray-500/70 transition">
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
};