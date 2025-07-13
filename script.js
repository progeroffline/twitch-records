function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function buildVideoUrl(filePath) {
  const baseUrl = 'https://f005.backblazeb2.com/file/twitchrecords/';
  return baseUrl + filePath;
}

const videoPath = getUrlParameter('video');

const player = videojs('my-video', {
  responsive: true,
  fluid: true,
  aspectRatio: '16:9',
});

if (videoPath) {
  const fullVideoUrl = buildVideoUrl(videoPath);
  player.src({
    src: fullVideoUrl,
    type: 'application/x-mpegURL',
  });

  const channelName = videoPath.split('/')[0] || 'Video Channel';
  document.querySelector('.channel-info h3').textContent = channelName;
  document.querySelector('.avatar').textContent = channelName.charAt(0).toUpperCase();
}
