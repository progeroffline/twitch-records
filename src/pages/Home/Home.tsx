import { useLocation } from "react-router-dom";

import ChannelBanner from "./components/ChannelBanner.tsx";
import CardTitle from "./components/CardTitle.tsx";
import VideoPlayer from "./components/VideoPlayer.tsx";
import DonationBanner from "./components/DonationBanner.tsx";
import VideoDownloader from "./components/VideoDownloader.tsx";
import { parseDateFromPath } from "./utils";

const Home = () => {
  // Get search parameters from the URL to determine which video to play.
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // Construct the full video path from the query parameter.
  const videoFilePath = `https://twitchrecords.b-cdn.net/${queryParams.get("video")}`;

  // Extract the date and title from the URL for display.
  const videoDate = parseDateFromPath(videoFilePath) ?? "";
  const cardTitle = queryParams.get("title") ?? "";

  return (
    <div className="max-w-[1024px] w-full bg-[#17212b] sm:rounded-2xl overflow-hidden shadow-[0_8px_32px_#0006] flex flex-col sm:border border-[rgba(255,255,255,0.08)]">
      <ChannelBanner />
      <CardTitle title={cardTitle} date={videoDate} />
      <VideoPlayer src={videoFilePath} />
      <VideoDownloader baseUrl={videoFilePath} />
      <DonationBanner />
    </div>
  );
};

export default Home;
