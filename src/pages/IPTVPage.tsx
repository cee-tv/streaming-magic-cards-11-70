import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";
import { channels, categories } from "../data/channels";
import { IPTVPlayer } from "../components/IPTVPlayer";
import { ChannelGrid } from "../components/ChannelGrid";
import type { Channel } from "../data/channels";

const IPTVPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [jwPlayer, setJwPlayer] = useState<any>(null);

  useEffect(() => {
    if (window.jwplayer && !jwPlayer) {
      window.jwplayer.key = 'XSuP4qMl+9tK17QNb+4+th2Pm9AWgMO/cYH8CI0HGGr7bdjo';
      const player = window.jwplayer("jwplayer-container");
      setJwPlayer(player);
    }
  }, []);

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
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <IPTVPlayer selectedChannel={selectedChannel} jwPlayer={jwPlayer} />

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