class TelegramVideoPlayer {
  constructor() {
    this.video = document.getElementById('video');
    this.overlay = document.getElementById('overlay');
    this.controls = document.getElementById('controls');
    this.playBtn = document.getElementById('playBtn');
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.playIcon = document.getElementById('playIcon');
    this.playPauseIcon = document.getElementById('playPauseIcon');
    this.progressBar = document.getElementById('progressBar');
    this.progressFill = document.getElementById('progressFill');
    this.timeDisplay = document.getElementById('timeDisplay');
    this.volumeBtn = document.getElementById('volumeBtn');
    this.volumeIcon = document.getElementById('volumeIcon');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.volumeFill = document.getElementById('volumeFill');
    this.fullscreenBtn = document.getElementById('fullscreenBtn');
    this.videoPlayer = document.getElementById('videoPlayer');

    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 1;
    this.controlsTimeout = null;
    this.hls = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.showOverlay();
    this.updateVolumeDisplay();
    this.video.volume = this.volume;
  }

  loadVideo(src) {
    if (this.hls) {
      this.hls.destroy();
    }

    // Check if the source is HLS (.m3u8)
    if (src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        this.hls = new Hls({
          enableWorker: false,
          lowLatencyMode: true,
          backBufferLength: 90,
        });
        this.hls.loadSource(src);
        this.hls.attachMedia(this.video);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS manifest loaded');
        });

        this.hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS error:', data);
        });
      } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        this.video.src = src;
      } else {
        console.error('HLS not supported');
      }
    } else {
      // Regular video file
      this.video.src = src;
    }
  }

  setupEventListeners() {
    // Play/Pause functionality
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    this.video.addEventListener('click', () => this.togglePlay());

    // Progress bar
    this.progressBar.addEventListener('click', e => this.seek(e));
    this.video.addEventListener('timeupdate', () => this.updateProgress());
    this.video.addEventListener('loadedmetadata', () => this.updateTimeDisplay());

    // Volume control
    this.volumeBtn.addEventListener('click', () => this.toggleMute());
    this.volumeSlider.addEventListener('click', e => this.setVolume(e));

    // Fullscreen
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Video events
    this.video.addEventListener('play', () => this.onPlay());
    this.video.addEventListener('pause', () => this.onPause());
    this.video.addEventListener('ended', () => this.onEnded());

    // Controls visibility
    this.videoPlayer.addEventListener('mousemove', () => this.showControls());
    this.videoPlayer.addEventListener('mouseleave', () => this.hideControls());

    // Keyboard shortcuts
    document.addEventListener('keydown', e => this.handleKeyboard(e));
  }

  togglePlay() {
    if (this.isPlaying) {
      this.video.pause();
    } else {
      this.video.play();
    }
  }

  onPlay() {
    this.isPlaying = true;
    this.playIcon.textContent = '⏹';
    this.playPauseIcon.textContent = '⏹';
    this.hideOverlay();
  }

  onPause() {
    this.isPlaying = false;
    this.playIcon.textContent = '▶';
    this.playPauseIcon.textContent = '▶';
    this.showOverlay();
  }

  onEnded() {
    this.isPlaying = false;
    this.playIcon.textContent = '▶';
    this.playPauseIcon.textContent = '▶';
    this.showOverlay();
  }

  showOverlay() {
    this.overlay.classList.add('visible');
  }

  hideOverlay() {
    this.overlay.classList.remove('visible');
  }

  showControls() {
    this.controls.classList.add('visible');
    clearTimeout(this.controlsTimeout);
    this.controlsTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.controls.classList.remove('visible');
      }
    }, 3000);
  }

  hideControls() {
    if (this.isPlaying) {
      this.controls.classList.remove('visible');
    }
  }

  seek(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.video.currentTime = pos * this.video.duration;
  }

  updateProgress() {
    if (this.video.duration) {
      const progress = (this.video.currentTime / this.video.duration) * 100;
      this.progressFill.style.width = progress + '%';
      this.updateTimeDisplay();
    }
  }

  updateTimeDisplay() {
    const current = this.formatTime(this.video.currentTime);
    const duration = this.formatTime(this.video.duration);
    this.timeDisplay.textContent = `${current} / ${duration}`;
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.video.muted = this.isMuted;
    this.updateVolumeDisplay();
  }

  setVolume(e) {
    const rect = this.volumeSlider.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.volume = Math.max(0, Math.min(1, pos));
    this.video.volume = this.volume;
    this.isMuted = this.volume === 0;
    this.video.muted = this.isMuted;
    this.updateVolumeDisplay();
  }

  updateVolumeDisplay() {
    this.volumeFill.style.width = this.volume * 100 + '%';

    if (this.isMuted || this.volume === 0) {
      this.volumeIcon.textContent = '🔇';
    } else if (this.volume < 0.5) {
      this.volumeIcon.textContent = '🔉';
    } else {
      this.volumeIcon.textContent = '🔊';
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      // Try different fullscreen methods for mobile compatibility
      if (this.videoPlayer.requestFullscreen) {
        this.videoPlayer.requestFullscreen();
      } else if (this.videoPlayer.webkitRequestFullscreen) {
        this.videoPlayer.webkitRequestFullscreen();
      } else if (this.videoPlayer.mozRequestFullScreen) {
        this.videoPlayer.mozRequestFullScreen();
      } else if (this.videoPlayer.msRequestFullscreen) {
        this.videoPlayer.msRequestFullscreen();
      } else if (this.video.webkitEnterFullscreen) {
        // iOS Safari fallback
        this.video.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  handleKeyboard(e) {
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        this.togglePlay();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.video.currentTime -= 10;
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.video.currentTime += 10;
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.volume = Math.min(1, this.volume + 0.1);
        this.video.volume = this.volume;
        this.updateVolumeDisplay();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.volume = Math.max(0, this.volume - 0.1);
        this.video.volume = this.volume;
        this.updateVolumeDisplay();
        break;
      case 'KeyM':
        e.preventDefault();
        this.toggleMute();
        break;
      case 'KeyF':
        e.preventDefault();
        this.toggleFullscreen();
        break;
    }
  }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Player will be initialized after loading video
});
