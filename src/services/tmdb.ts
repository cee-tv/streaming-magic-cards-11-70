const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "72ba10c429914157380d27104ed18fa";

const headers = {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJhMTBjNDI5OTE0MTU3MzgwOGQyNzEwNGVkMThmYSIsInN1YiI6IjY0ZjVhNTUwMTIxOTdlMDBmZWE5MzdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84b7vWpVEilAbly4RpS01E9tyirHdhSXjcpfmTczI3Q",
  "Content-Type": "application/json",
};

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
}

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
      media_type: item.media_type || mediaType
    }));
  },

  getTopRated: async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/${mediaType}/top_rated`, { headers });
    const data = await response.json();
    return data.results.map((item: Movie) => ({
      ...item,
      media_type: item.media_type || mediaType
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

  search: async (query: string): Promise<Movie[]> => {
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
    try {
      const response = await fetch(
        `${BASE_URL}/${mediaType}/${id}?append_to_response=videos`,
        { headers }
      );
      
      if (response.ok) {
        const data = await response.json();
        return {
          ...data,
          media_type: mediaType
        };
      }
      
      const otherType = mediaType === 'movie' ? 'tv' : 'movie';
      const retryResponse = await fetch(
        `${BASE_URL}/${otherType}/${id}?append_to_response=videos`,
        { headers }
      );
      
      if (retryResponse.ok) {
        const data = await retryResponse.json();
        return {
          ...data,
          media_type: otherType
        };
      }
      
      throw new Error(`Failed to fetch details for ID ${id}`);
    } catch (error) {
      console.error(`Error fetching details for ID ${id}:`, error);
      throw error;
    }
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