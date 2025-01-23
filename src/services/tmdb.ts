const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "72ba10c429914157380d27104ed18faa";

const headers = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJhMTBjNDI5OTE0MTU3MzgwOGQyNzEwNGVkMThmYSIsInN1YiI6IjY0ZjVhNTUwMTIxOTdlMDBmZWE5MzdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84b7vWpVEilAbly4RpS01E9tyirHdhSXjcpfmTczI3Q",
  accept: "application/json"
};

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  still_path: string | null;
  runtime: number;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  episodes?: Episode[];
}

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
  videos: {
    results: Array<{
      key: string;
      site: string;
      type: string;
    }>;
  };
  runtime?: number;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  tagline?: string;
  seasons?: Season[];
}

export const tmdb = {
  getTrending: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    console.log('Fetching trending:', mediaType);
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/week`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: item.media_type || mediaType
    }));
  },

  getPopular: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    console.log('Fetching popular:', mediaType);
    const response = await fetch(`${BASE_URL}/${mediaType}/popular`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: item.media_type || mediaType
    }));
  },

  getTopRated: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    console.log('Fetching top rated:', mediaType);
    const response = await fetch(`${BASE_URL}/${mediaType}/top_rated`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: item.media_type || mediaType
    }));
  },

  getByGenre: async (mediaType: 'movie' | 'tv' = 'movie', genreId: number): Promise<Movie[]> => {
    console.log('Fetching by genre:', mediaType, genreId);
    const response = await fetch(
      `${BASE_URL}/discover/${mediaType}?with_genres=${genreId}`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: mediaType
    }));
  },

  search: async (query: string): Promise<Movie[]> => {
    console.log('Searching:', query);
    if (!query) return [];
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.filter((item: Movie) => 
      (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
    );
  },

  getMovieDetails: async (id: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<MovieDetails> => {
    console.log('Fetching details:', mediaType, id);
    try {
      const response = await fetch(
        `${BASE_URL}/${mediaType}/${id}?append_to_response=videos`,
        { headers }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        ...data,
        media_type: mediaType
      };
    } catch (error) {
      console.error(`Error fetching details for ID ${id}:`, error);
      throw error;
    }
  },

  getTVSeasonDetails: async (tvId: number, seasonNumber: number): Promise<Season> => {
    console.log('Fetching season details:', tvId, seasonNumber);
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  getTrailerKey: (videos: MovieDetails['videos']): string | null => {
    if (!videos?.results) return null;
    const trailer = videos.results.find(
      (video) => video.site === "YouTube" && 
      (video.type === "Trailer" || video.type === "Teaser")
    );
    return trailer ? trailer.key : null;
  },

  getSimilar: async (id: number, mediaType: 'movie' | 'tv'): Promise<Movie[]> => {
    console.log('Fetching similar:', mediaType, id);
    const response = await fetch(
      `${BASE_URL}/${mediaType}/${id}/similar`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: mediaType
    }));
  }
};
