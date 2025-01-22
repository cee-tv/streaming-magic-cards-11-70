import { useEffect, useRef } from "react";
import shaka from 'shaka-player';
import type { Channel } from "../data/channels";

interface IPTVPlayerProps {
  selectedChannel: Channel | null;
  jwPlayer: any; // Keep for backwards compatibility during transition
}

export const IPTVPlayer = ({ selectedChannel }: IPTVPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useEffect(() => {
    // Install polyfills
    shaka.polyfill.installAll();

    // Initialize player
    if (videoRef.current && !playerRef.current) {
      const player = new shaka.Player(videoRef.current);
      
      // Error handling
      player.addEventListener('error', (event) => {
        console.error('Error code', event.detail.code, 'object', event.detail);
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

        // Load the content
        await playerRef.current.load(selectedChannel.streamUrl);
        
        // Start playback
        videoRef.current.play();
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    loadContent();
  }, [selectedChannel]);

  return (
    <div className="w-full aspect-video bg-black mb-8 rounded-lg overflow-hidden shadow-lg">
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