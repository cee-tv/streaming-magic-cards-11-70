import { useEffect } from "react";
import type { Channel } from "../data/channels";

interface IPTVPlayerProps {
  selectedChannel: Channel | null;
  jwPlayer: any;
}

export const IPTVPlayer = ({ selectedChannel, jwPlayer }: IPTVPlayerProps) => {
  useEffect(() => {
    if (jwPlayer && selectedChannel) {
      const playerConfig = {
        width: "100%",
        height: "100%",
        autostart: true,
        controls: true,
        stretching: "uniform",
        file: selectedChannel.streamUrl,
        type: selectedChannel.type,
        drm: selectedChannel.type === 'mpd' && selectedChannel.drmConfig ? {
          clearkey: {
            keyId: selectedChannel.drmConfig.keyId,
            key: selectedChannel.drmConfig.key
          }
        } : undefined,
        skin: {
          name: "netflix"
        },
        mute: false,
        volume: 90,
        displaytitle: true,
        displaydescription: true,
        playbackRateControls: true,
        repeat: false,
        controlbar: {
          volumetooltip: true,
          elements: [
            "play",
            "progress",
            "current",
            "duration",
            "mute",
            "volume",
            "fullscreen"
          ]
        },
        visualization: {
          effect: "bars"
        }
      };

      console.log("Setting up player with config:", playerConfig);
      jwPlayer.setup(playerConfig);
    }
  }, [selectedChannel, jwPlayer]);

  return (
    <div className="w-full aspect-video bg-black mb-8 rounded-lg overflow-hidden shadow-lg">
      <div id="jwplayer-container"></div>
    </div>
  );
};