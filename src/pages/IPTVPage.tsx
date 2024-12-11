import { Navigation } from "@/components/Navigation";
import { IPTVPlayer } from "@/components/IPTVPlayer";
import { channels } from "@/services/iptv";
import { useState } from "react";

const IPTVPage = () => {
  const [selectedChannelId, setSelectedChannelId] = useState(channels[0].id);
  const selectedChannel = channels.find(c => c.id === selectedChannelId);

  if (!selectedChannel) {
    return <div>Channel not found</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <select 
            value={selectedChannelId}
            onChange={(e) => setSelectedChannelId(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            {channels.map(channel => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        </div>
        <IPTVPlayer channel={selectedChannel} />
      </div>
    </div>
  );
};

export default IPTVPage;