"use client";

import { useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
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
      <div className="audio-player d-flex p-4 bg-body-tertiary rounded-3 shadow my-4">
        <div className="ap-cover">
          <iframe className="rounded-3 shadow" width={155} height={155} src={process.env.NEXT_PUBLIC_BASE_URL + "/air/pic23.html"}></iframe>
        </div>

        <div className="ap-title d-flex flex-column px-3">
          <p className="d-flex align-items-center">
            <div className={"bars " + (isPlaying ? "" : "not-playing")}>
              <span />
              <span />
              <span />
            </div>
            <span>Currently Playing:</span>
          </p>
          <iframe height={120} src={process.env.NEXT_PUBLIC_BASE_URL + "/air/onair23.html"}></iframe>
        </div>

        <div className="stream-play-container">
          {isPlaying ? (
            <button type="button" className="pause player-btn rounded-circle" onClick={() => handlePause()} aria-label="Pause">
              <BsPauseFill />
            </button>
          ) : (
            <button type="button" className="play player-btn rounded-circle" onClick={() => handlePlay()} aria-label="Play">
              <BsPlayFill />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
