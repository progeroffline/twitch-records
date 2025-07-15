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
  const urlWithQuality = baseUrl + filePath + `/${quality}/master.m3u8`;
  return urlWithQuality;
}

const videoPath = getUrlParameter('video');
const videoTitle = getUrlParameter('title');

if (videoPath) {
  const fullVideoUrl = buildVideoUrl(videoPath);
  const videoInfo = extractVideoInfo(videoPath);

  document.querySelector('.video-title').textContent = videoTitle || 'Назва відео';
  document.querySelector('.video-date').textContent = videoInfo.formattedDate;

  // const player = videojs('video', {
  //   fluid: true,
  //   responsive: true,
  //   plugins: {
  //     qualitySelectorHls: {
  //       displayCurrentQuality: true,
  //     },
  //   },
  //   html5: {
  //     hls: {
  //       enableLowInitialPlaylist: true,
  //       smoothQualityChange: true,
  //       overrideNative: true,
  //     },
  //   },
  // });
  //
  // player.ready(() => {
  //   player.ready(() => {
  //     player.src(
  //       {
  //         src: buildVideoUrl(videoPath, '1080'),
  //         type: 'application/x-mpegURL',
  //       },
  //       {
  //         src: buildVideoUrl(videoPath, '480'),
  //         type: 'application/x-mpegURL',
  //       }
  //     );
  //   });
  // });
  const player = videojs('video', {
    fluid: true,
    responsive: true,
  });

  const qualities = {
    '1080p': buildVideoUrl(videoPath, '1080'),
    '480p': buildVideoUrl(videoPath, '480'),
  };

  let currentQuality = '1080p';

  player.ready(() => {
    // Устанавливаем начальное качество
    player.src({
      src: qualities[currentQuality],
      type: 'application/x-mpegURL',
    });

    // Создаем простую кнопку-меню
    const qualityButton = player.controlBar.addChild('MenuButton', {
      name: 'QualityButton',
      text: currentQuality,
      className: 'vjs-quality-button vjs-control vjs-button',
    });

    // Добавляем пункты меню
    Object.keys(qualities).forEach(quality => {
      const menuItem = qualityButton.menu.addChild('MenuItem', {
        label: quality,
        handler: () => {
          if (quality !== currentQuality) {
            const currentTime = player.currentTime();
            const wasPaused = player.paused();

            player.src({
              src: qualities[quality],
              type: 'application/x-mpegURL',
            });

            player.one('loadedmetadata', () => {
              player.currentTime(currentTime);
              if (!wasPaused) {
                player.play();
              }
            });

            currentQuality = quality;
            qualityButton.label(quality); // Обновляем текст кнопки
          }
        },
      });
    });
  });
}
