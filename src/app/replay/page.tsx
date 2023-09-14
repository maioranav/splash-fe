import replay from "../../../public/podcast.json";

export default function Replay() {
  const podcast = replay.podcast;
  return (
    <>
      <main>
        <section className="bg-body-tertiary pt-5">
          <div className="container">
            <div className="row mt-5"></div>
            <div className="row mt-4 hidden">(ri)Ascolta i programmi più belli di Radio Splash!</div>
            <div className="row my-4">
              <h2>Splash Replay!</h2>
              <h5>
                <span>ri</span>Ascolta l&apos;ultima puntata dei tuoi programmi preferiti
              </h5>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <div className="container">
            <div className="row splash-replay">
              {podcast.map((prog, pi) => (
                <div key={"rep-" + pi} className="mb-3">
                  <h5 className="replay-title">{prog.titolo}</h5>
                  <h6 className="replay-artist">{prog.artista}</h6>
                  <div className="row">
                    {prog.sessioni.map((s, i) => (
                      <div key={"replay-" + pi + "-s" + i} className="podcast-player col-12 col-md-6 p-3">
                        <div>{prog.titolo + " - Session " + s.sessione}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
