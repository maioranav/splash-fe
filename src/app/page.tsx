import { CoverArt } from "./components/coverart/CoverArt";
import { HomeShows } from "./components/homeshows/HomeShows";
import { NowPlaying } from "./components/nowplaying/NowPlaying";

export default function Home() {
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row m-0 mb-4">
          <NowPlaying />
          <CoverArt />
        </div>
        <div className="container-fluid p-0 m-0">
          <HomeShows />
        </div>
      </div>
    </>
  );
}
