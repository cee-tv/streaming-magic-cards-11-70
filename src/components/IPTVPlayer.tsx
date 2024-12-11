import { useEffect, useRef, useState } from "react";
import { Channel } from "@/services/iptv";
import { toast } from "sonner";

declare global {
  interface Window {
    jwplayer: any;
  }
}

interface IPTVPlayerProps {
  channel: Channel;
  onError?: (error: Error) => void;
}

export const IPTVPlayer = ({ channel, onError }: IPTVPlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    try {
      const playerInstance = window.jwplayer(playerRef.current);
      console.log("Player configuration:", {
        file: channel.url,
        type: channel.type === 'mpd' ? 'dash' : 'hls',
        width: "100%",
        height: "100%",
        aspectratio: "16:9",
        autostart: true,
        primary: "html5",
        hlshtml: true,
        stretching: "uniform",
        playbackRateControls: true,
        preload: "auto",
        mute: false,
        cast: {},
        streaming: {
          bufferWhilePaused: true,
          forceNative: false,
          lowLatency: true,
          rebufferingTimeout: 10,
          retryOnError: true,
          stallTimeout: 10,
          startQualityLevel: -1,
          strictCasting: true
        },
        cors: true,
        withCredentials: true,
        ...(channel.drm && {
          drm: {
            clearkey: {
              keyId: channel.drm.keyId,
              key: channel.drm.key
            }
          }
        })
      });

      playerInstance.setup({
        file: channel.url,
        type: channel.type === 'mpd' ? 'dash' : 'hls',
        width: "100%",
        height: "100%",
        aspectratio: "16:9",
        autostart: true,
        primary: "html5",
        hlshtml: true,
        stretching: "uniform",
        playbackRateControls: true,
        preload: "auto",
        mute: false,
        cast: {},
        streaming: {
          bufferWhilePaused: true,
          forceNative: false,
          lowLatency: true,
          rebufferingTimeout: 10,
          retryOnError: true,
          stallTimeout: 10,
          startQualityLevel: -1,
          strictCasting: true
        },
        cors: true,
        withCredentials: true,
        ...(channel.drm && {
          drm: {
            clearkey: {
              keyId: channel.drm.keyId,
              key: channel.drm.key
            }
          }
        })
      });

      playerInstance.on('error', (e: any) => {
        console.error('Error initializing JW Player:', e);
        const errorMessage = 'Failed to play video. Please try again later.';
        setError(errorMessage);
        toast.error(errorMessage);
        if (onError) onError(new Error(errorMessage));
      });

      return () => {
        playerInstance.remove();
      };
    } catch (err) {
      console.error('Error initializing JW Player:', err);
      const errorMessage = 'Failed to initialize video player. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
      if (onError) onError(err as Error);
    }
  }, [channel, onError]);

  return (
    <div className="relative w-full aspect-video bg-black">
      <div ref={playerRef} className="absolute inset-0" />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};