"use client";
import { MutableRefObject, useRef, useEffect } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import "./TvPlayer.scss";

interface VideoOptions {
  options: {
    autoplay: boolean;
    controls: boolean;
    responsive: boolean;
    fluid?: boolean;
    fill?: boolean;
    sources: VideoSources[];
  };
}

interface VideoSources {
  src: string;
  type: string;
}

export const TvPlayer = ({ options }: VideoOptions) => {
  const videoRef: MutableRefObject<null | HTMLDivElement> = useRef(null);
  const playerRef: MutableRefObject<null | Player> = useRef(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player?.autoplay(options.autoplay);
      player?.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="my-4 position-relative videocontainer-height">
      <div className="position-absolute bg-warning fs-6 py-2 px-4 shadow rounded z-1" style={{ top: "-20px", right: "50px" }}>
        TV
      </div>
      <div data-vjs-player ref={videoRef} style={{ height: "100%" }}></div>
    </div>
  );
};

export default TvPlayer;
