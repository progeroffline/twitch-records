import HlsPlyrPlayer from '../../../components/HlsPlyrPlayer.tsx';
import './VideoPlayer.css';

export default function VideoPlayer({ src }) {
  return (
    <div class="video-container">
      <HlsPlyrPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
    </div>
  );
}
