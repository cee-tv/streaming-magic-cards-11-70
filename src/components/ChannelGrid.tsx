import { Card, CardContent } from "@/components/ui/card";
import { Tv } from "lucide-react";
import type { Channel } from "../data/channels";

interface ChannelGridProps {
  category: string;
  channels: Channel[];
  selectedChannel: Channel | null;
  onChannelSelect: (channel: Channel) => void;
}

export const ChannelGrid = ({ category, channels, selectedChannel, onChannelSelect }: ChannelGridProps) => {
  const categoryChannels = channels.filter((channel) => channel.category === category);

  if (categoryChannels.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-white text-xl font-bold mb-3">{category}</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {categoryChannels.map((channel, index) => (
          <Card
            key={channel.id || `${category}-${index}`}
            className={`cursor-pointer transition-transform hover:scale-105 ${
              selectedChannel?.name === channel.name ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onChannelSelect(channel)}
          >
            <CardContent className="p-2 flex flex-col items-center justify-center">
              {channel.logo ? (
                <img
                  src={channel.logo}
                  alt={channel.name}
                  className="w-12 h-12 object-contain mb-1"
                />
              ) : (
                <Tv className="w-12 h-12 mb-1" />
              )}
              <p className="text-center text-sm font-medium line-clamp-2">{channel.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};