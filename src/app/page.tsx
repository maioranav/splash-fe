import RadioPlayer from "./components/RadioPlayer";
import "./page.module.scss";

export default function Home() {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col-12 col-lg-6 p-2">
            <RadioPlayer />
          </div>
          <div className="col-12 col-lg-6 p-2">qua ci va qualcosa tipo notizie o player video</div>
        </div>
      </main>
    </>
  );
}
