document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('player');
  const streamLink =
    'https://cdn.twitchrecords.space/file/twitchrecords/leb1ga/13-07-2025-20-53/1080/master.m3u8';

  const defaultOptions = {
    controls: [
      'play-large',
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'captions',
      'settings',
      'pip',
      'download',
      'fullscreen',
    ],
    quality: {
      default: 1080,
      options: [1080, 480],
      forced: true,
      onChange: quality => updateQuality(quality),
    },
    storage: { enabled: true, key: 'plyr' },
    captions: { active: false, update: false, language: 'auto' },
  };

  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: false,
      lowLatencyMode: true,
    });

    hls.loadSource(streamLink);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      const availableQualities = hls.levels.map(level => level.height);

      if (availableQualities.length > 0) {
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: quality => updateQuality(quality),
        };
      }

      const player = new Plyr(video, defaultOptions);

      window.hls = hls;
      window.player = player;

      player.on('ready', () => {
        console.log('Plyr is ready');
      });

      player.on('error', error => {
        console.error('Plyr error:', error);
      });
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            hls.destroy();
            break;
        }
      }
    });

    function updateQuality(newQuality) {
      if (window.hls && window.hls.levels) {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === parseInt(newQuality)) {
            window.hls.currentLevel = levelIndex;
          }
        });
      }
    }

    window.updateQuality = updateQuality;
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamLink;
    const player = new Plyr(video, defaultOptions);
    window.player = player;
  } else {
  }
});
