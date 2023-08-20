"use client";

import { useState } from "react";
import "./RadioPlayer.scss";

export default function RadioPlayer() {
  const [player] = useState(typeof Audio !== "undefined" && new Audio(process.env.NEXT_PUBLIC_BASE_AUDIO_STREAM + "/stream"));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    player && player.play();
    player && setIsPlaying(true);
  };

  const handlePause = () => {
    player && player.pause();
    player && setIsPlaying(false);
  };

  return (
    <>
      <div className="row audio-player d-flex p-4 bg-body-tertiary rounded-3 shadow my-4">
        <div className="ap-cover col-lg-3">
          <iframe className="rounded-3 shadow" width={155} height={155} src={process.env.NEXT_PUBLIC_BASE_URL + "/air/pic23.html"}></iframe>
        </div>

        <div className="col-lg-2">
          {isPlaying ? (
            <button type="button" className="pause" onClick={() => handlePause()} aria-label="Pause">
              Pausa
            </button>
          ) : (
            <button type="button" className="play" onClick={() => handlePlay()} aria-label="Play">
              Play
            </button>
          )}
        </div>

        <div className="ap-title col-lg-7">
          <iframe src={process.env.NEXT_PUBLIC_BASE_URL + "/air/onair23.html"}></iframe>
        </div>
      </div>
    </>
  );
}
