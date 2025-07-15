import { useLocation } from 'react-router-dom';

import ChannelBanner from './components/ChannelBanner.tsx';
import CardTitle from './components/CardTitle.tsx';
import VideoPlayer from './components/VideoPlayer.tsx';
import DonationBanner from './components/DonationBanner.tsx';
import './Home.css';

const Home = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const videoFilePath = queryParams.get('video');
  const cardTitle = queryParams.get('title');

  return (
    <div class="video-player-container">
      <ChannelBanner />
      <CardTitle title={cardTitle} date="1231" />
      <VideoPlayer src={videoFilePath} />
      <DonationBanner />
    </div>
  );
};

export default Home;
