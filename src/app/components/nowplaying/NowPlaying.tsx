import "./NowPlaying.css";
export const NowPlaying = () => {
  return (
    <div className="col-9 m-0 dynamic-background">
      <div className="content d-flex flex-column h-100 justify-content-center p-5">
        <div className="my-3">
          <i className="bi bi-play-fill me-2 text-primary"></i>
          <span>Now Playing</span>
        </div>
        <p className="my-2 mb-5 display-4">Odesza - A moment apart</p>
        <audio src="https://ssl2.azotosolutions.com:1002/stream" controls />
        <p className="mt-5 mb-2">Scarica l&apos;app di RadioSplash, portaci sempre con te!</p>
      </div>
      <div className="background bg1"></div>
      <div className="background bg2"></div>
      <div className="background bg3"></div>
    </div>
  );
};
