import { Navigation } from "@/components/Navigation";
import { TVShows } from "@/components/TVShows";

const TVShowsPage = () => {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <div className="pt-24">
        <TVShows />
      </div>
    </div>
  );
};

export default TVShowsPage;