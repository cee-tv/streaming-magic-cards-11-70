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
        
        // Determine stream type based on URL extension
        const isHLS = channel.streamUrl.includes('.m3u8');
        const isDASH = channel.streamUrl.includes('.mpd');
        
        const playerConfig: any = {
          file: channel.streamUrl,
          type: isDASH ? 'dash' : (isHLS ? 'hls' : 'mp4'),
          width: '100%',
          height: '100%',
          autostart: true,
          hlshtml: true, // Force HLS playback in HTML5
          primary: 'html5',
          // Enable cross-origin resource sharing
          cors: true,
        };

        // Add DRM configuration if present
        if (channel.drmConfig?.clearkey) {
          const [keyId, key] = channel.drmConfig.clearkey.split(':');
          playerConfig.drm = {
            clearkey: {
              keyId,
              key,
            }
          };
        }

        console.log('Player configuration:', playerConfig);
        
        playerInstance.setup(playerConfig);
        setPlayerInitialized(true);

        // Add error event listener
        playerInstance.on('error', (e: any) => {
          console.error('JW Player error:', e);
          toast({
            variant: "destructive",
            title: "Playback Error",
            description: `Failed to play stream: ${e.message}`,
          });
        });

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