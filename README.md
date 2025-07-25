# Twitch Records

Twitch Records is a web application designed for viewing archived Twitch
streams. Built with React and Vite, it features a custom video player using
Hls.js and Plyr, providing a smooth and feature-rich viewing experience. The
interface is styled with Tailwind CSS to resemble a Telegram Mini App and
dynamically loads video content and metadata from URL parameters.

The application is primarily used for the "Лебидло Aрхів Стрімов" channel, which
archives streams from Mykhailo Lebiga.

## Features

- **HLS Video Streaming**: Supports playback of HLS (.m3u8) video streams for
  adaptive bitrate streaming.
- **Custom Video Player**: Utilizes Plyr to provide a modern player with
  controls for playback, speed, quality, volume, and fullscreen mode.
- **Dynamic Content Loading**: Video files and titles are loaded dynamically via
  URL query parameters (`?video=` and `?title=`).
- **Automatic Date Parsing**: The application can parse the stream date directly
  from the video filename (e.g., `DD-MM-YYYY-HH-mm.mp4`).
- **Responsive UI**: A clean, dark-themed interface that is fully responsive and
  optimized for various screen sizes.
- **Component-Based Architecture**: Built with React, ensuring a modular and
  maintainable codebase.

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Video Playback**: Hls.js, Plyr
- **Routing**: React Router
- **Linting**: ESLint

## Getting Started

To run the project locally, follow these steps.

### Prerequisites

- Node.js (v18 or later)
- npm (or your preferred package manager)

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/progeroffline/twitch-records.git
    ```

2.  Navigate to the project directory:

    ```sh
    cd twitch-records
    ```

3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1.  Start the development server:

    ```sh
    npm run dev
    ```

2.  Open your browser and navigate to the local URL provided (e.g.,
    `http://localhost:5173`).

3.  To view a video, you must provide the `video` and `title` query parameters
    in the URL. The video filename should follow the date format
    `DD-MM-YYYY-HH-mm` for correct date parsing.

    **Example:**

    ```
    http://localhost:5173/?video=05-09-2023-20-30.mp4&title=My%20First%20Archived%20Stream
    ```

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the application for production into the `dist`
  directory.
- `npm run preview`: Serves the production build locally to preview the final
  app.
- `npm run deploy`: Deploys the contents of the `dist` directory to GitHub
  Pages.
