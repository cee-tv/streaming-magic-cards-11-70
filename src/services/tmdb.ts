import { MovieDetails } from "@/types";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  accept: "application/json",
};

export interface MovieDetails {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  seasons?: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
}

export const tmdb = {
  getTrending: async (mediaType: string): Promise<MovieDetails[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/${mediaType}/week?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getMovieDetails: async (id: string): Promise<MovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    return await response.json();
  },

  getTVShowDetails: async (id: string): Promise<MovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    return await response.json();
  },

  getPopularMovies: async (): Promise<MovieDetails[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getPopularTVShows: async (): Promise<MovieDetails[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  searchMulti: async (query: string): Promise<MovieDetails[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },
};