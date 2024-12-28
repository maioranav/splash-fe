import { Spot } from "../components/spot/Spot";
import { Stinger } from "../components/stinger/Stinger";
import { VideoPlayer } from "../components/videoplayer/VideoPlayer";
import { IStinger } from "../models/IStinger";

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

  const stingerOptions: IStinger = {
    title: "Un universo di Musica",
    subtitle: "da ascoltare e da vedere",
    url: "/imgs/pexels-pixabay-302871.jpg",
  };

  return (
    <>
      <div className="container mt-5">
        <VideoPlayer options={videoJsOptions} />
      </div>
      <Stinger options={stingerOptions} />
      <div className="container mt-5">
        <Spot />
      </div>
    </>
  );
}
