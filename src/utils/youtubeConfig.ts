import { getMobileDetect } from "@/lib/utils";

export interface YouTubePlayer {
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  seekTo: (value: number) => void;
  container: HTMLDivElement;
  internalPlayer: YouTubePlayer;
}

export interface YouTubeEvent {
  target: YouTubePlayer;
}

const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
const { isMobile } = getMobileDetect(userAgent);

export const getDefaultOptions = (firstLoad: boolean = false): Record<string, object> => ({
  playerVars: {
    rel: 0,
    mute: (isMobile() || firstLoad) ? 1 : 0,
    loop: 1,
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    disablekb: 1,
    enablejsapi: 1,
    playsinline: 1,
    cc_load_policy: 0,
    modestbranding: 3,
  },
});

export const IS_MOBILE = isMobile();