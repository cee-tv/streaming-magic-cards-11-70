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
  media_type?: string;
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
      media_type: mediaType
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
    console.log(`Fetching details for ${mediaType} with ID ${id}`); // Debug log
    const response = await fetch(
      `${BASE_URL}/${mediaType}/${id}?append_to_response=videos`,
      { headers }
    );
    if (!response.ok) {
      // If the first attempt fails, try the other media type
      const otherType = mediaType === 'movie' ? 'tv' : 'movie';
      console.log(`Retrying with ${otherType} type`); // Debug log
      const retryResponse = await fetch(
        `${BASE_URL}/${otherType}/${id}?append_to_response=videos`,
        { headers }
      );
      if (!retryResponse.ok) {
        throw new Error(`Failed to fetch ${mediaType} details for ID ${id}`);
      }
      return retryResponse.json();
    }
    return response.json();
  },

  getTrailerKey: (videos: MovieDetails['videos']): string | null => {
    const trailer = videos.results.find(
      (video) => video.site === "YouTube" && 
      (video.type === "Trailer" || video.type === "Teaser")
    );
    return trailer ? trailer.key : null;
  }
};