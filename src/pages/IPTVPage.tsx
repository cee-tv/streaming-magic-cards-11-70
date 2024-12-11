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
      licenseUrl: "https://clearkey-base64.herokuapp.com/api/",
      keyId: "2615129ef2c846a9bbd43a641c7303ef",
      key: "07c7f996b1734ea288641a68e1cfdc4d"
    }
  },
  {
    id: "2",
    name: "A2Z",
    category: "Entertainment",
    streamUrl: "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/cg_a2z.mpd",
    drmConfig: {
      licenseUrl: "https://clearkey-base64.herokuapp.com/api/",
      keyId: "f703e4c8ec9041eeb5028ab4248fa094",
      key: "c22f2162e176eee6273a5d0b68d19530"
    }
  }
];

const categories = ["News", "Sports", "Entertainment", "Movies"];

const IPTVPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [jwPlayer, setJwPlayer] = useState<any>(null);

  useEffect(() => {
    if (window.jwplayer && !jwPlayer) {
      // Set JW Player key
      window.jwplayer.key = 'XSuP4qMl+9tK17QNb+4+th2Pm9AWgMO/cYH8CI0HGGr7bdjo';
      const player = window.jwplayer("jwplayer-container");
      setJwPlayer(player);
    }
  }, []);

  useEffect(() => {
    if (jwPlayer && selectedChannel) {
      const playerConfig = {
        width: "100%",
        height: "100%",
        autostart: true,
        controls: true,
        stretching: "uniform",
        file: selectedChannel.streamUrl,
        type: "dash",
        drm: {
          clearkey: {
            keyId: selectedChannel.drmConfig?.keyId,
            key: selectedChannel.drmConfig?.key
          }
        },
        // Player controls and UI customization
        skin: {
          name: "netflix"
        },
        mute: false,
        volume: 90,
        displaytitle: true,
        displaydescription: true,
        playbackRateControls: true,
        repeat: false,
        // Additional control settings
        controlbar: {
          volumetooltip: true,
          elements: [
            "play",
            "progress",
            "current",
            "duration",
            "mute",
            "volume",
            "fullscreen"
          ]
        },
        // Improved visualization
        visualization: {
          effect: "bars"
        }
      };

      console.log("Setting up player with config:", playerConfig);
      jwPlayer.setup(playerConfig);
    }
  }, [selectedChannel, jwPlayer]);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navigation onMediaTypeChange={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        {/* JW Player Container */}
        <div className="w-full aspect-video bg-black mb-8 rounded-lg overflow-hidden shadow-lg">
          <div id="jwplayer-container"></div>
        </div>

        {/* Channel Categories */}
        {categories.map((category) => {
          const categoryChannels = channels
            .filter((channel) => channel.category === category)
            .slice(0, 10);

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