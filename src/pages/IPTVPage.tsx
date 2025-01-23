import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";
import { channels, categories } from "../data/channels";
import { IPTVPlayer } from "../components/IPTVPlayer";
import { ChannelGrid } from "../components/ChannelGrid";
import type { Channel } from "../data/channels";

const IPTVPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // Auto-select first channel on mount
  useEffect(() => {
    if (channels.length > 0 && !selectedChannel) {
      setSelectedChannel(channels[0]);
    }
  }, []);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onMediaTypeChange={() => {}} />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <IPTVPlayer selectedChannel={selectedChannel} jwPlayer={null} />

        {categories.map((category) => (
          <ChannelGrid
            key={category}
            category={category}
            channels={channels}
            selectedChannel={selectedChannel}
            onChannelSelect={handleChannelSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default IPTVPage;