const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "72ba10c429914157380d27104ed18fa";

const headers = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJhMTBjNDI5OTE0MTU3MzgwOGQyNzEwNGVkMThmYSIsInN1YiI6IjY0ZjVhNTUwMTIxOTdlMDBmZWE5MzdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84b7vWpVEilAbly4RpS01E9tyirHdhSXjcpfmTczI3Q",
  "Content-Type": "application/json",
};

export interface Movie {
  id: number;
  title: string;
  name?: string; // For TV shows
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  first_air_date?: string; // For TV shows
}

export interface MovieDetails extends Movie {
  videos: {
    results: Array<{
      key: string;
      site: string;
      type: string;
    }>;
  };
}

export const tmdb = {
  getTrending: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/week`, { headers });
    const data = await response.json();
    return data.results;
  },

  getPopular: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/${mediaType}/popular`, { headers });
    const data = await response.json();
    return data.results;
  },

  getTopRated: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/${mediaType}/top_rated`, { headers });
    const data = await response.json();
    return data.results;
  },

  search: async (query: string): Promise<Movie[]> => {
    if (!query) return [];
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,
      { headers }
    );
    const data = await response.json();
    return data.results;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?append_to_response=videos`,
      { headers }
    );
    const data = await response.json();
    return data;
  },

  getTrailerKey: (videos: MovieDetails['videos']): string | null => {
    const trailer = videos.results.find(
      (video) => video.site === "YouTube" && 
      (video.type === "Trailer" || video.type === "Teaser")
    );
    return trailer ? trailer.key : null;
  }
};