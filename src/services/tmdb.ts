import { Movie, MovieDetails } from "@/types";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

export const tmdb = {
  getTrending: async (mediaType: string): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/${mediaType}/week?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getMovieDetails: async (id: string): Promise<MovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`,
      { headers }
    );
    return await response.json();
  },

  getTVShowDetails: async (id: string): Promise<MovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`,
      { headers }
    );
    return await response.json();
  },

  getPopular: async (mediaType: string): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/popular?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getTopRated: async (mediaType: string): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/top_rated?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getByGenre: async (mediaType: string, genreId: number): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_genres=${genreId}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  searchMulti: async (query: string): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getTrailerKey: (videos: MovieDetails['videos']): string | null => {
    if (!videos?.results) return null;
    
    // First try to find a YouTube trailer
    const youtubeTrailer = videos.results.find(
      video => video.site === 'YouTube' && video.type === 'Trailer'
    );
    if (youtubeTrailer) return youtubeTrailer.key;

    // If no trailer, try to find any YouTube video
    const youtubeVideo = videos.results.find(
      video => video.site === 'YouTube'
    );
    if (youtubeVideo) return youtubeVideo.key;

    return null;
  }
};

export type { Movie, MovieDetails };