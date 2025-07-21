import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';

const HlsPlyrPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    playerRef.current = new Plyr(video, {
      controls: [
        'play-large',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'fullscreen',
        'speed',
        'quality',
      ],
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="plyr__video-embed"
      controls
      style={{ width: '100%' }}
    />
  );
};

export default HlsPlyrPlayer;
