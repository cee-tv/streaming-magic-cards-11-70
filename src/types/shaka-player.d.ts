declare module 'shaka-player' {
  export class Player {
    constructor(videoElement: HTMLVideoElement | null);
    configure(config: any): void;
    load(manifestUri: string): Promise<void>;
    destroy(): Promise<void>;
    addEventListener(event: string, handler: (event: any) => void): void;
  }

  export const polyfill: {
    installAll(): void;
  };
}