import { IPTVChannel } from "@/services/iptv";
import { Card } from "./ui/card";

interface IPTVCardProps {
  channel: IPTVChannel;
  onPlay: (channel: IPTVChannel) => void;
}

export const IPTVCard = ({ channel, onPlay }: IPTVCardProps) => {
  return (
    <Card 
      className="relative group cursor-pointer overflow-hidden transition-transform hover:scale-105"
      onClick={() => onPlay(channel)}
    >
      <div className="aspect-video relative">
        <img
          src={channel.logo}
          alt={channel.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2 bg-black/80">
        <h3 className="text-white text-sm font-medium truncate">{channel.name}</h3>
      </div>
    </Card>
  );
};