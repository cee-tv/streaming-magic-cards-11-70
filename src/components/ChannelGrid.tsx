import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Play, Tv } from "lucide-react";
import type { Channel } from "../data/channels";
import { useEffect, useState } from "react";

interface ChannelGridProps {
  category: string;
  channels: Channel[];
  selectedChannel: Channel | null;
  onChannelSelect: (channel: Channel) => void;
}

export const ChannelGrid = ({ category, channels, selectedChannel, onChannelSelect }: ChannelGridProps) => {
  const categoryChannels = channels.filter((channel) => channel.category === category);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Preload images for visible channels
    const imageUrls = categoryChannels
      .filter(channel => channel.logo)
      .map(channel => channel.logo as string);

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(url));
      };
      img.src = url;
    });
  }, [categoryChannels]);

  if (categoryChannels.length === 0) return null;

  return (
    <div className="mb-4">
      <h2 className="text-white text-xl font-bold mb-2 px-2">{category}</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 p-2">
          {categoryChannels.map((channel, index) => (
            <Card
              key={channel.id || `${category}-${index}`}
              className={`group flex-shrink-0 w-[120px] h-[120px] cursor-pointer transition-transform hover:scale-105 relative ${
                selectedChannel?.name === channel.name ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onChannelSelect(channel)}
            >
              <CardContent className="p-2 h-full flex flex-col items-center justify-center relative">
                <div className="w-full h-full flex items-center justify-center">
                  {channel.logo ? (
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className={`w-full h-full object-contain p-2 transition-opacity duration-300 ${
                        loadedImages.has(channel.logo) ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Tv className="w-12 h-12" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-netflix-red rounded-full p-2">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                {selectedChannel?.name === channel.name && (
                  <div className="absolute bottom-0 left-0 right-0 animate-[slideUp_0.3s_ease-out_forwards]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <p className="text-center text-sm font-medium line-clamp-2 relative z-10 text-white p-2">
                      {channel.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};