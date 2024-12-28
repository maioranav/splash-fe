import { VideoPlayer } from "../components/videoplayer/VideoPlayer";

export default function Tv() {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    poster: "/imgs/splashtvstart.jpg",
    fluid: true,
    sources: [
      {
        src: process.env.NEXT_PUBLIC_BASE_VIDEO_STREAM,
        type: "application/vnd.apple.mpegurl",
      },
    ],
  };

  return (
    <div className="container mt-5">
      <VideoPlayer options={videoJsOptions} />
    </div>
  );
}
