export interface MovieDetails {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  videos?: {
    results: {
      key: string;
      type: string;
      site: string;
    }[];
  };
  seasons?: {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    poster_path: string | null;
  }[];
}

export interface Episode {
  id: number;
  name: string;
  episode_number: number;
  still_path: string | null;
  overview: string;
}