import { Movie, MovieDetails } from "@/types";

const TMDB_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTljY2JkNDViNmY1MTJjN2E0YWZmMjZlNDMwMGJkOSIsInN1YiI6IjY1ZTY0ZDY4YzYxM2NlMDE4NjE2NmQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O9eKqhzT9I-KKsxY5qKcpXBqXVDrD8-7DV3SJd2BJ8M";

const headers = {
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

export const tmdb = {
  getTrending: async (mediaType: string): Promise<Movie[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${mediaType}/week`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`,
      { headers }
    );
    return await response.json();
  },

  getTVShowDetails: async (id: number): Promise<MovieDetails> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos`,
      { headers }
    );
    return await response.json();
  },

  getPopularMovies: async (): Promise<Movie[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getPopularTVShows: async (): Promise<Movie[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  searchMulti: async (query: string): Promise<Movie[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getTrailerKey: (videos: MovieDetails['videos']): string | null => {
    if (!videos?.results) return null;
    
    const youtubeTrailer = videos.results.find(
      video => video.site === 'YouTube' && video.type === 'Trailer'
    );
    if (youtubeTrailer) return youtubeTrailer.key;

    const youtubeVideo = videos.results.find(
      video => video.site === 'YouTube'
    );
    if (youtubeVideo) return youtubeVideo.key;

    return null;
  }
};