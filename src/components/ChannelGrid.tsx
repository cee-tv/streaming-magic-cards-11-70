import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
    <div className="mb-4">
      <h2 className="text-white text-xl font-bold mb-2 px-2">{category}</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 p-2">
          {categoryChannels.map((channel, index) => (
            <Card
              key={channel.id || `${category}-${index}`}
              className={`flex-shrink-0 w-[120px] cursor-pointer transition-transform hover:scale-105 ${
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
                <p className="text-center text-sm font-medium line-clamp-2 w-full">{channel.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};