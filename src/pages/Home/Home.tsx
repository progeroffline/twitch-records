import { useLocation } from 'react-router-dom';

import ChannelBanner from './components/ChannelBanner.tsx';
import CardTitle from './components/CardTitle.tsx';
import VideoPlayer from './components/VideoPlayer.tsx';
import DonationBanner from './components/DonationBanner.tsx';
import { parseDateFromPath } from './utils';

const Home = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const videoFilePath = `https://cdn.twitchrecords.space/file/twitchrecords/${queryParams.get('video')}`;
  const videoDate = parseDateFromPath(videoFilePath ? videoFilePath : '') ?? '';
  const cardTitle = queryParams.get('title') ?? '';

  return (
    <div className="max-w-[800px] w-full bg-[#17212b] rounded-2xl overflow-hidden shadow-[0_8px_32px_#0006] flex flex-col border border-[rgba(255,255,255,0.08)]">
      <ChannelBanner />
      <CardTitle title={cardTitle} date={videoDate} />
      <VideoPlayer src={videoFilePath} />
      <DonationBanner />
    </div>
  );
};

export default Home;
