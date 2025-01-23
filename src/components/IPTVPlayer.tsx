import { useEffect, useRef } from "react";
import * as shaka from 'shaka-player';
import { useToast } from "@/hooks/use-toast";
import type { Channel } from "../data/channels";

interface IPTVPlayerProps {
  selectedChannel: Channel | null;
  jwPlayer: any; // Keep for backwards compatibility during transition
}

export const IPTVPlayer = ({ selectedChannel }: IPTVPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Install polyfills
    shaka.polyfill.installAll();

    // Check browser support
    if (!shaka.Player.isBrowserSupported()) {
      toast({
        title: "Browser not supported",
        description: "Please use a modern browser that supports MSE/EME",
        variant: "destructive",
      });
      return;
    }

    // Initialize player
    if (videoRef.current && !playerRef.current) {
      const player = new shaka.Player(videoRef.current);
      
      // Error handling
      player.addEventListener('error', (event) => {
        console.error('Detailed error:', event.detail);
        toast({
          title: "Playback Error",
          description: `Error code ${event.detail.code}: ${event.detail.message}`,
          variant: "destructive",
        });
      });

      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      if (!selectedChannel || !playerRef.current || !videoRef.current) return;

      try {
        // Unload any previous content
        await playerRef.current.unload();
        
        // Configure DRM if needed
        if (selectedChannel.type === 'mpd' && selectedChannel.drmConfig) {
          playerRef.current.configure({
            drm: {
              clearKeys: {
                [selectedChannel.drmConfig.keyId]: selectedChannel.drmConfig.key
              }
            }
          });
        }

        console.log('Loading stream URL:', selectedChannel.streamUrl);
        
        // Load the content
        await playerRef.current.load(selectedChannel.streamUrl);
        
        // Start playback
        videoRef.current.play().catch(error => {
          console.error('Playback error:', error);
          toast({
            title: "Playback Error",
            description: "Could not start playback. Please try again.",
            variant: "destructive",
          });
        });
      } catch (error) {
        console.error('Error loading content:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load the channel. Please try another one.",
          variant: "destructive",
        });
      }
    };

    loadContent();
  }, [selectedChannel]);

  return (
    <div className="w-full aspect-video bg-netflix-black mb-8 rounded-lg overflow-hidden shadow-lg">
      <video 
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        playsInline
      />
    </div>
  );
};