import { CoverArt } from "./components/coverart/CoverArt";
import { HomeShows } from "./components/homeshows/HomeShows";
import { Maintenance } from "./components/maintenance/Maintenance";
import { NowPlaying } from "./components/nowplaying/NowPlaying";
import { NonceService } from "./utils/nonce.service";

export default async function Home() {
  const nonce = await NonceService.instance.getNonce();
  return (
    <>
      {nonce ? (
        <div className="container-fluid p-0">
          <div className="row m-0 mb-4">
            <NowPlaying nonce={nonce} />
            <CoverArt nonce={nonce} />
          </div>
          <div className="container-fluid p-0 m-0">
            <HomeShows nonce={nonce} />
          </div>
        </div>
      ) : (
        <Maintenance />
      )}
    </>
  );
}
