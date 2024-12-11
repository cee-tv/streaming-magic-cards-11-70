export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  first_air_date?: string;
  media_type: string;
}

export interface MovieDetails extends Movie {
  videos?: {
    results: Array<{
      key: string;
      site: string;
      type: string;
    }>;
  };
  seasons?: Array<{
    id: number;
    name: string;
    episode_count: number;
    season_number: number;
    poster_path: string | null;
  }>;
}

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJhMTBjNDI5OTE0MTU3MzgwOGQyNzEwNGVkMThmYSIsInN1YiI6IjY0ZjVhNTUwMTIxOTdlMDBmZWE5MzdmMSIsInNjb3BlcyI6WyJhcGl"];

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export const tmdb = {
  getTrending: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/week`, { headers });
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: item.media_type || mediaType
    }));
  },

  getPopular: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/${mediaType}/popular`, { headers });
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: mediaType
    }));
  },

  getTopRated: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/${mediaType}/top_rated`, { headers });
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: mediaType
    }));
  },

  getByGenre: async (mediaType: 'movie' | 'tv' = 'movie', genreId: number): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/discover/${mediaType}?with_genres=${genreId}`,
      { headers }
    );
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: mediaType
    }));
  },

  searchMulti: async (query: string): Promise<Movie[]> => {
    if (!query) return [];
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,
      { headers }
    );
    const data = await response.json();
    return data.results.filter((item: Movie) => 
      (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
    );
  },

  getMovieDetails: async (id: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<MovieDetails> => {
    const response = await fetch(
      `${BASE_URL}/${mediaType}/${id}?append_to_response=videos`,
      { headers }
    );
    const data = await response.json();
    return {
      ...data,
      media_type: mediaType
    };
  },

  getTrailerKey: (videos: MovieDetails['videos']): string | null => {
    if (!videos?.results) return null;
    const trailer = videos.results.find(
      (video) => video.site === "YouTube" && 
      (video.type === "Trailer" || video.type === "Teaser")
    );
    return trailer ? trailer.key : null;
  }
};