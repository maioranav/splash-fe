"use client";
import replay from "../../../public/podcast.json";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { playerRef } from "../components/AudioPlayer";
import { useEffect, useState } from "react";

export default function Replay() {
  const podcast = replay.podcast;
  const player = playerRef.current;
  const [isPlaying, setIsPlaying] = useState(!player?.paused);
  const [currentSrc, setCurrentSrc] = useState(player?.currentSrc);

  const handlePlay = (url: string) => {
    if (player && player?.src != process.env.NEXT_PUBLIC_BASE_PODCAST_URL + url) {
      player && setIsPlaying(false);
      setCurrentSrc(process.env.NEXT_PUBLIC_BASE_PODCAST_URL + url);
      player.src = process.env.NEXT_PUBLIC_BASE_PODCAST_URL + url;
    }
    player && player.play();
    player && setIsPlaying(true);
  };

  const handlePause = () => {
    player && player.pause();
    player && setIsPlaying(false);
  };

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
                      <div key={"replay-" + pi + "-s" + i} className="col-12 col-md-6 p-3">
                        <div className="podcast-player">
                          <img src={process.env.NEXT_PUBLIC_BASE_PODCAST_URL + prog.img} alt={prog.titolo + " cover image"} />
                          <div className="podcast-title">
                            <div>
                              {" "}
                              <span>
                                {prog.titolo}
                                {prog.sessioni.length > 1 && " // Session " + s.sessione}
                              </span>
                              {isPlaying && currentSrc === process.env.NEXT_PUBLIC_BASE_PODCAST_URL + s.url ? (
                                <button type="button" className="pause player-btn rounded-circle" onClick={() => handlePause()} aria-label="Pause">
                                  <BsPauseFill />
                                </button>
                              ) : (
                                <button type="button" className="play player-btn rounded-circle" onClick={() => handlePlay(s.url)} aria-label="Play">
                                  <BsPlayFill />
                                </button>
                              )}
                            </div>

                            <div
                              className={
                                isPlaying && currentSrc === process.env.NEXT_PUBLIC_BASE_PODCAST_URL + s.url
                                  ? "podcast-duration"
                                  : "podcast-duration hidden-duration"
                              }
                            >
                              DURATA
                            </div>
                          </div>
                        </div>
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
