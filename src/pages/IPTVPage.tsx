import { Navigation } from "@/components/Navigation";
import { IPTVCard } from "@/components/IPTVCard";
import { IPTVPlayer } from "@/components/IPTVPlayer";
import { iptvService, IPTVChannel } from "@/services/iptv";
import { useState } from "react";

const IPTVPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<IPTVChannel | null>(null);
  const categories = iptvService.getCategories();

  const handlePlayChannel = (channel: IPTVChannel) => {
    setSelectedChannel(channel);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      
      <div className="container mx-auto px-4 pt-20">
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {iptvService.getChannelsByCategory(category).map((channel) => (
                <IPTVCard
                  key={channel.id}
                  channel={channel}
                  onPlay={handlePlayChannel}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedChannel && (
        <IPTVPlayer
          isOpen={!!selectedChannel}
          onClose={() => setSelectedChannel(null)}
          channel={selectedChannel}
        />
      )}
    </div>
  );
};

export default IPTVPage;