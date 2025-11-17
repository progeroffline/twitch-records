import { useMemo } from "react";

/**
 * A custom hook to determine the direct download URL and quality from a base HLS URL.
 * @param baseUrl - The base URL of the video, expected to contain 'master.m3u8'.
 * @returns An object with the direct download URL for the MP4 and the video quality string.
 */
const useVideoUrls = (baseUrl: string) => {
  return useMemo(() => {
    const urlParts = baseUrl.split("/");

    // Find the part of the URL that specifies the quality (e.g., '1080p' or '1080').
    const qualityPart = urlParts.find((part) => /^\d+p?$/.test(part));

    // Construct the URL for the full MP4 record by replacing the HLS filename.
    const mp4UrlParts = [...urlParts];
    if (qualityPart) {
      mp4UrlParts[mp4UrlParts.length - 1] = "whole-record.mp4";
    }
    const downloadUrl = mp4UrlParts.join("/");

    // Format the quality string to always include 'p' (e.g., '1080p').
    const quality = qualityPart ? `${qualityPart.replace(/p$/, "")}p` : "";

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
