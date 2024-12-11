import { Dialog, DialogContent } from "./ui/dialog";
import { useEffect } from "react";
import { IPTVChannel } from "@/services/iptv";

interface IPTVPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  channel: IPTVChannel;
}

export const IPTVPlayer = ({ isOpen, onClose, channel }: IPTVPlayerProps) => {
  useEffect(() => {
    if (isOpen) {
      // Initialize JW Player here with the channel data
      const playerInstance = (window as any).jwplayer("jwplayer-container");
      
      const playerConfig: any = {
        file: channel.streamUrl,
        type: channel.streamUrl.endsWith('.mpd') ? 'dash' : 'hls',
        width: '100%',
        height: '100%',
      };

      // Add DRM configuration if present
      if (channel.drmConfig) {
        playerConfig.drm = {
          clearkey: {
            keyId: channel.drmConfig.clearkey.split(':')[0],
            key: channel.drmConfig.clearkey.split(':')[1]
          }
        };
      }

      playerInstance.setup(playerConfig);

      return () => {
        playerInstance.remove();
      };
    }
  }, [isOpen, channel]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 bg-black">
        <div id="jwplayer-container" className="w-full h-full">
          {/* JW Player will be initialized here */}
        </div>
      </DialogContent>
    </Dialog>
  );
};