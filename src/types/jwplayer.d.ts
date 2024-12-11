interface JWPlayerStatic {
  (id: string): JWPlayer;
  key: string;
}

interface JWPlayer {
  setup(config: any): void;
  load(config: any): void;
}

interface Window {
  jwplayer: JWPlayerStatic;
}