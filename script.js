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

  return {
    formattedDate,
  };
}

function buildVideoUrl(filePath) {
  const baseUrl = 'https://f005.backblazeb2.com/file/twitchrecords/';
  return baseUrl + filePath;
}

const videoPath = getUrlParameter('video');
const videoTitle = getUrlParameter('title');

const player = videojs('video-player', {
  responsive: true,
  fluid: true,
  aspectRatio: '16:9',
  html5: {
    hls: {
      enableLowInitialPlaylist: true,
      smoothQualityChange: true,
    },
  },
});

player.on('error', function () {});

if (videoPath) {
  const fullVideoUrl = buildVideoUrl(videoPath);
  const videoInfo = extractVideoInfo(videoPath);

  player.src({
    src: fullVideoUrl,
    type: 'application/x-mpegURL',
  });

  document.querySelector('.video-title').textContent = videoInfo.videoTitle;
  document.querySelector('.video-date').textContent = videoInfo.formattedDate;
}
player.ready(function () {});
