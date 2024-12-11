import { Dialog, DialogContent } from "./ui/dialog";
import { useEffect, useState } from "react";
import { IPTVChannel } from "@/services/iptv";
import { useToast } from "./ui/use-toast";

interface IPTVPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  channel: IPTVChannel;
}

export const IPTVPlayer = ({ isOpen, onClose, channel }: IPTVPlayerProps) => {
  const { toast } = useToast();
  const [playerInitialized, setPlayerInitialized] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Check if JW Player is available
      if (typeof (window as any).jwplayer === 'undefined') {
        toast({
          variant: "destructive",
          title: "Error",
          description: "JW Player failed to load. Please refresh the page.",
        });
        return;
      }

      try {
        const playerInstance = (window as any).jwplayer("jwplayer-container");
        
        const playerConfig: any = {
          file: channel.streamUrl,
          type: channel.streamUrl.endsWith('.mpd') ? 'dash' : 'hls',
          width: '100%',
          height: '100%',
          autostart: true,
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
        setPlayerInitialized(true);

        return () => {
          if (playerInitialized) {
            playerInstance.remove();
          }
        };
      } catch (error) {
        console.error('Error initializing JW Player:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to initialize video player. Please try again.",
        });
      }
    }
  }, [isOpen, channel, toast, playerInitialized]);

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