import { CoverArt } from "../coverart/CoverArt";
import "./NowPlaying.css";
import { TitleComponent } from "./TitleComponent";
export const NowPlaying = (props: INowPlaying) => {
  return (
    <div className="col-12 col-md-6 col-xxl-9 m-0 dynamic-background">
      <div className="content d-flex flex-column h-100 justify-content-center p-2 p-lg-5">
        <div className="my-3">
          <i className="bi bi-play-fill me-2 text-primary"></i>
          <span>Now Playing</span>
        </div>
        <p className="my-2 mb-5 display-4 text-uppercase">
          <TitleComponent nonce={props.nonce} />
        </p>
        <audio src={process.env.NEXT_PUBLIC_BASE_AUDIO_STREAM} controls />
        <CoverArt nonce={props.nonce} embed={true} />
        <p className="mt-5 mb-2">Scarica l&apos;app di RadioSplash, portaci sempre con te!</p>
      </div>
      <div className="background bg1"></div>
      <div className="background bg2"></div>
      <div className="background bg3"></div>
    </div>
  );
};
interface INowPlaying {
  nonce: string;
}
