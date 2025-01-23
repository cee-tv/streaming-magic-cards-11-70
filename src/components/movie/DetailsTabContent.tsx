import { MovieDetails } from "@/services/tmdb";

interface DetailsTabContentProps {
  details: MovieDetails | undefined;
  releaseYear: number | null;
  votePercentage: number;
}

export const DetailsTabContent = ({ details, releaseYear, votePercentage }: DetailsTabContentProps) => {
  if (!details) return null;
  
  return (
    <div className="text-white space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Show Information</h3>
          <div className="space-y-2">
            {releaseYear && (
              <p><span className="text-gray-400">Release Year:</span> {releaseYear}</p>
            )}
            <p><span className="text-gray-400">Rating:</span> {votePercentage}%</p>
            {details.status && (
              <p><span className="text-gray-400">Status:</span> {details.status}</p>
            )}
            {details.number_of_seasons && (
              <p><span className="text-gray-400">Seasons:</span> {details.number_of_seasons}</p>
            )}
            {details.number_of_episodes && (
              <p><span className="text-gray-400">Episodes:</span> {details.number_of_episodes}</p>
            )}
            {details.runtime && (
              <p><span className="text-gray-400">Runtime:</span> {details.runtime} min</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
          <div className="space-y-2">
            {details.genres && (
              <p>
                <span className="text-gray-400">Genres:</span>{' '}
                {details.genres.map((genre) => genre.name).join(', ')}
              </p>
            )}
            {details.networks && details.networks.length > 0 && (
              <p>
                <span className="text-gray-400">Networks:</span>{' '}
                {details.networks.map((network) => network.name).join(', ')}
              </p>
            )}
            {details.production_companies && details.production_companies.length > 0 && (
              <p>
                <span className="text-gray-400">Production:</span>{' '}
                {details.production_companies.map((company) => company.name).join(', ')}
              </p>
            )}
            {details.original_language && (
              <p>
                <span className="text-gray-400">Original Language:</span>{' '}
                {details.original_language.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};