import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tv } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  logo?: string;
  category: string;
  streamUrl: string;
  drmConfig?: {
    licenseUrl: string;
    keyId: string;
    key: string;
  };
}

const channels: Channel[] = [
  {
    id: "1",
    name: "TV5 HD",
    category: "Entertainment",
    streamUrl: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd",
    drmConfig: {
      licenseUrl: "https://license.example.com/clearkey",
      keyId: "2615129ef2c846a9bbd43a641c7303ef",
      key: "07c7f996b1734ea288641a68e1cfdc4d"
    }
  },
  // Add more channels here following the same structure
];

const categories = ["News", "Sports", "Entertainment", "Movies"];

const IPTVPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [jwPlayer, setJwPlayer] = useState<any>(null);

  useEffect(() => {
    // Initialize JW Player
    if (window.jwplayer && !jwPlayer) {
      const player = window.jwplayer("jwplayer-container");
      player.setup({
        file: selectedChannel?.streamUrl || "",
        type: "dash",
        drm: {
          clearkey: selectedChannel?.drmConfig ? {
            url: selectedChannel.drmConfig.licenseUrl,
            keys: {
              [selectedChannel.drmConfig.keyId]: selectedChannel.drmConfig.key
            }
          } : undefined
        }
      });
      setJwPlayer(player);
    }
  }, [selectedChannel]);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    if (jwPlayer) {
      jwPlayer.load({
        file: channel.streamUrl,
        type: "dash",
        drm: {
          clearkey: channel.drmConfig ? {
            url: channel.drmConfig.licenseUrl,
            keys: {
              [channel.drmConfig.keyId]: channel.drmConfig.key
            }
          } : undefined
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        {/* JW Player Container */}
        <div className="w-full aspect-video bg-black mb-8">
          <div id="jwplayer-container"></div>
        </div>

        {/* Channel Categories */}
        {categories.map((category) => {
          const categoryChannels = channels
            .filter((channel) => channel.category === category)
            .slice(0, 10); // Limit to 10 channels per category

          if (categoryChannels.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categoryChannels.map((channel) => (
                  <Card
                    key={channel.id}
                    className={`cursor-pointer transition-transform hover:scale-105 ${
                      selectedChannel?.id === channel.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleChannelSelect(channel)}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      {channel.logo ? (
                        <img
                          src={channel.logo}
                          alt={channel.name}
                          className="w-16 h-16 object-contain mb-2"
                        />
                      ) : (
                        <Tv className="w-16 h-16 mb-2" />
                      )}
                      <p className="text-center font-medium">{channel.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IPTVPage;