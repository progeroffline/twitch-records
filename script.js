function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function formatDate(dateString) {
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function extractVideoInfo(videoPath) {
  const pathParts = videoPath.split('/');
  const datePart = pathParts[1] || '';

  const dateMatch = datePart.match(/(\d{2})-(\d{2})-(\d{4})-(\d{2})-(\d{2})/);
  let formattedDate = 'Дата не вказана';

  if (dateMatch) {
    const [, day, month, year, hour, minute] = dateMatch;
    const dateString = `${year}-${month}-${day}`;
    formattedDate = formatDate(dateString);
    formattedDate = `Запис від ${formattedDate} о ${hour}:${minute}`;
  }

  return { formattedDate };
}

function buildVideoUrl(filePath, quality) {
  const baseUrl = 'https://cdn.twitchrecords.space/file/twitchrecords/';
  return baseUrl + filePath;
}

const videoPath = getUrlParameter('video');
const videoTitle = getUrlParameter('title');

document.addEventListener('DOMContentLoaded', () => {
  if (videoPath) {
    const fullVideoUrl = buildVideoUrl(videoPath);
    const videoInfo = extractVideoInfo(videoPath);

    document.querySelector('.video-title').textContent = videoTitle || 'Назва відео';
    document.querySelector('.video-date').textContent = videoInfo.formattedDate;

    const video = document.getElementById('hls-video-player');
    const streamLink = buildVideoUrl(videoPath);

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
  }
});
