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
        
        // Enhanced stream type detection
        const isHLS = channel.streamUrl.toLowerCase().includes('.m3u8');
        const isDASH = channel.streamUrl.toLowerCase().includes('.mpd');
        
        const playerConfig: any = {
          file: channel.streamUrl,
          type: isDASH ? 'dash' : (isHLS ? 'hls' : 'mp4'),
          width: '100%',
          height: '100%',
          autostart: true,
          primary: 'html5',
          hlshtml: true,
          stretching: 'uniform',
          playbackRateControls: true,
          preload: 'auto',
          mute: false,
          cast: {},
          // Enhanced streaming settings
          streaming: {
            bufferWhilePaused: true,
            forceNative: false,
            lowLatency: true,
            rebufferingTimeout: 10,
            retryOnError: true,
            stallTimeout: 10,
            startQualityLevel: -1,
            strictCasting: true,
          },
          // Cross-origin settings
          cors: true,
          withCredentials: true,
        };

        // Enhanced DRM configuration
        if (channel.drmConfig?.clearkey) {
          const [keyId, key] = channel.drmConfig.clearkey.split(':');
          playerConfig.drm = {
            clearkey: {
              keyId,
              key,
            },
            widevine: {
              url: channel.drmConfig.licenseUrl
            }
          };
        }

        console.log('Player configuration:', playerConfig);
        
        playerInstance.setup(playerConfig);
        setPlayerInitialized(true);

        // Enhanced error handling
        playerInstance.on('error', (e: any) => {
          console.error('JW Player error:', e);
          const errorMessage = e.message || 'Unknown playback error';
          toast({
            variant: "destructive",
            title: "Playback Error",
            description: `Failed to play stream: ${errorMessage}`,
          });
        });

        // Add success event listener
        playerInstance.on('ready', () => {
          console.log('Player ready');
          toast({
            title: "Ready",
            description: "Stream loaded successfully",
          });
        });

        // Add quality level change listener
        playerInstance.on('levels', (event: any) => {
          console.log('Available quality levels:', event.levels);
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