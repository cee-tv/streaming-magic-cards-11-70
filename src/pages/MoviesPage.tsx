import { Navigation } from "@/components/Navigation";
import { Movies } from "@/components/Movies";

const MoviesPage = () => {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <div className="pt-24">
        <Movies />
      </div>
    </div>
  );
};

export default MoviesPage;