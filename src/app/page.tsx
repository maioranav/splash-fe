import { CoverArt } from "./components/coverart/CoverArt";
import { HomeShows } from "./components/homeshows/HomeShows";
import { Maintenance } from "./components/maintenance/Maintenance";
import { NowPlaying } from "./components/nowplaying/NowPlaying";

export default async function Home() {
  const nonce = await getNonce();
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
const getNonce = async () => {
  try {
    const req = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/main/title/FRONTEND SECRET NONCE");
    const data = await req.json();
    return data.data as string;
  } catch (e) {
    console.error("Error while fetching nonce", e);
    return "";
  }
};
