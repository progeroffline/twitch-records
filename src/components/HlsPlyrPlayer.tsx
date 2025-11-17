import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

import Hls from "hls.js";
import Plyr from "plyr";

type HlsPlyrPlayerProps = {
  src: string;
};

const HlsPlyrPlayer = ({ src }: HlsPlyrPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  // Detect if the user is on an iOS device.
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    // For iOS, we use the native HTML5 video player, so we don't initialize Plyr.
    // The native player has better compatibility and performance on these devices.
    if (isIOS || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    // Use Hls.js for browsers that support it.
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    }
    // For other browsers that support HLS natively (like Safari on macOS), set the src directly.
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    // Initialize the Plyr player for a custom UI.
    playerRef.current = new Plyr(video, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      keyboard: {
        focused: true,
        global: true,
      },
      config: {
        hls: {
          maxBufferLength: 120,
          maxMaxBufferLength: 240,
          backBufferLength: 60,
        },
      },
    });

    // Ensure the player is destroyed on component unmount to prevent memory leaks.
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [src, isIOS]);

  // On iOS, render a native <video> element. It provides the best user experience
  // and allows using system features like AirPlay and Picture-in-Picture.
  if (isIOS) {
    return (
      <video
        src={src}
        controls
        style={{ width: "100%", height: "100%" }}
        className="plyr__video-embed" // Use Plyr's class for consistent aspect ratio.
      />
    );
  }

  // For all other devices, render the video element that will be enhanced by Plyr.
  return (
    <video
      ref={videoRef}
      className="plyr__video-embed"
      controls
      style={{ width: "100%" }}
    />
  );
};

export default HlsPlyrPlayer;
