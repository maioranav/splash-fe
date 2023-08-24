import RadioPlayer from "./components/RadioPlayer/RadioPlayer";
import TvPlayer from "./components/TvPlayer/TvPlayer";
import "./page.module.scss";

export default function Home() {
  const tvOptions = {
    autoplay: false,
    controls: true,
    responsive: false,
    fluid: false,
    fill: true,
    poster: process.env.NEXT_PUBLIC_BASE_URL + "/onairtv/splashstarttv.jpg",
    sources: [
      {
        src: process.env.NEXT_PUBLIC_BASE_VIDEO_STREAM,
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col-12 col-lg-6 p-2">
            <RadioPlayer />
          </div>
          <div className="col-12 col-lg-6 p-2">
            <TvPlayer options={tvOptions}></TvPlayer>
          </div>
        </div>
      </main>
    </>
  );
}
