import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import { useEffect, useState } from "react";
import { Tv } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const channels = [
  {
    id: 1,
    name: "Channel 1",
    logo: "tv",
    embedUrl: "https://example.com/channel1/embed"
  },
  {
    id: 2,
    name: "Channel 2",
    logo: "tv",
    embedUrl: "https://example.com/channel2/embed"
  },
  // Add more channels as needed
];

const IPTVPage = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);

  const { data: trending = [] } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: () => tmdb.getTrending("movie"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (trending.length > 0) {
        setCurrentMovieIndex((prev) => 
          prev === trending.length - 1 ? 0 : prev + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [trending.length]);

  const randomMovie = trending.length > 0 
    ? trending[currentMovieIndex]
    : null;

  if (!randomMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <Hero movie={randomMovie} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="md:col-span-2 bg-netflix-dark rounded-lg overflow-hidden">
            <iframe
              src={selectedChannel.embedUrl}
              className="w-full aspect-video"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Channel List Section */}
          <div className="md:col-span-1">
            <h2 className="text-white text-xl font-bold mb-4">Channels</h2>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {channels.map((channel) => (
                  <Card
                    key={channel.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedChannel.id === channel.id
                        ? "bg-netflix-red text-white"
                        : "bg-netflix-black text-gray-300 hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedChannel(channel)}
                  >
                    <div className="flex items-center space-x-3">
                      <Tv className="w-6 h-6" />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPTVPage;