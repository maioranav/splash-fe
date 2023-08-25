"use client";

import { useEffect, useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import "./RadioPlayer.scss";

export default function RadioPlayer() {
  const [player] = useState(typeof Audio !== "undefined" && new Audio(process.env.NEXT_PUBLIC_BASE_AUDIO_STREAM + "/stream"));
  const [isPlaying, setIsPlaying] = useState(false);

  let updateBackground: NodeJS.Timeout;
  let [winWidth, setWinWidth] = useState(1920);

  const handlePlay = () => {
    player && player.play();
    player && setIsPlaying(true);
  };

  const handlePause = () => {
    player && player.pause();
    player && setIsPlaying(false);
  };

  const setBackground = (): void => {
    const coverPlayer = document.querySelector(".audio-player");
    if (coverPlayer) {
      let back = `
      background-image: url("https://www.radiosplash.it/air/OnAir.jpg");
      background-size: cover;
      background-position: center;
      backdrop-filter: blur(2px);
    `;
      coverPlayer.setAttribute("style", back);
    }
  };

  const removeBackground = () => {
    const coverPlayer = document.querySelector(".audio-player");
    if (coverPlayer) {
      coverPlayer.setAttribute("style", "");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWinWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (winWidth < 576) {
      setBackground();
    } else {
      removeBackground();
    }
  }, [winWidth]);

  return (
    <>
      <div className="audio-player d-flex p-4 bg-body-tertiary rounded-3 shadow my-4">
        <div className="position-absolute bg-primary text-light fs-6 py-2 px-4 shadow rounded z-1" style={{ top: "-20px", right: "50px" }}>
          FM
        </div>
        <div className="ap-cover d-none d-sm-block">
          <iframe className="rounded-3 shadow" width={155} height={155} src={process.env.NEXT_PUBLIC_BASE_URL + "/air/pic23.html"}></iframe>
        </div>

        <div className="ap-title d-flex flex-column px-3">
          <p className="d-flex align-items-center">
            <span className={"bars " + (isPlaying ? "" : "not-playing")}>
              <span />
              <span />
              <span />
            </span>
            <span>Currently Playing:</span>
          </p>
          <iframe className="w-100" height={120} src={process.env.NEXT_PUBLIC_BASE_URL + "/air/onair23.html"}></iframe>
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
