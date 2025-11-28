declare namespace YT {
  class Player {
    constructor(elementId: string, config: PlayerConfig);
    pauseVideo(): void;
  }

  interface PlayerConfig {
    events: {
      onStateChange: (event: OnStateChangeEvent) => void;
    };
  }

  interface OnStateChangeEvent {
    data: number;
  }

  const PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}
