import { Navigation } from "@/components/Navigation";
import { useState } from "react";

const MyList = () => {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={setMediaType} />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-white mb-8">My List</h1>
        {/* Add your list content here */}
      </div>
    </div>
  );
};

export default MyList;