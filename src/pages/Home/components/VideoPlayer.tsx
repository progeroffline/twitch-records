import HlsPlyrPlayer from '../../../components/HlsPlyrPlayer.tsx';

type VideoPlayerProps = {
  src: string;
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <div className="relative w-full bg-black aspect-video overflow-hidden">
      <HlsPlyrPlayer src={src} />
    </div>
  );
}
