import { useMemo } from "react";

/**
 * A custom hook to determine the direct download URL and quality from a video URL.
 * Supports URLs like '/path/to/2025/7/25/21-55/720/video.mp4'.
 * @param baseUrl - The base URL of the video.
 * @returns An object with the direct download URL for the MP4 and the video quality string.
 */
const useVideoUrls = (baseUrl: string) => {
  return useMemo(() => {
    const urlParts = baseUrl.split("/");

    // The quality is expected to be the folder right before the video filename
    const filename = urlParts[urlParts.length - 1];
    const qualityPart = urlParts[urlParts.length - 2];

    // Only treat it as quality if it matches digits optionally followed by 'p'
    const quality = /^\d+p?$/.test(qualityPart)
      ? `${qualityPart.replace(/p$/, "")}p`
      : "";

    // Construct the download URL by replacing the filename with 'whole-record.mp4'
    const downloadUrlParts = [...urlParts];
    downloadUrlParts[downloadUrlParts.length - 1] = "whole-record.mp4";
    const downloadUrl = downloadUrlParts.join("/");

    return { downloadUrl, quality };
  }, [baseUrl]);
};

type VideoDownloaderProps = {
  baseUrl: string;
};

const VideoDownloader = ({ baseUrl }: VideoDownloaderProps) => {
  const { downloadUrl, quality } = useVideoUrls(baseUrl);

  // Do not render the component if the base URL is not a valid HLS stream.
  if (!baseUrl.includes("master.m3u8")) {
    return null;
  }

  const linkClasses =
    "px-6 py-3 bg-[#2b3642] text-white font-semibold rounded-lg shadow-md hover:bg-[#455a64] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors w-full sm:w-auto sm:min-w-[256px] text-center no-underline";

  // Unified download component for all devices.
  return (
    <div className="p-4 bg-[#17212b] flex flex-col justify-center items-center gap-2">
      <a href={downloadUrl} download className={linkClasses}>
        Завантажити запис ({quality})
      </a>
      <p className="text-xs text-gray-400 text-center max-w-xs">
        Якщо завантаження не працює, спробуйте інший браузер.
      </p>
    </div>
  );
};

export default VideoDownloader;
