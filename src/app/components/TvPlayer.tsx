"use client";

import { TheosPlayer } from "@aka_theos/react-hls-player";
import Hls from "hls.js";
import { MutableRefObject, useRef, useState } from "react";

export default function TvPlayer() {
  const player = useRef() as MutableRefObject<HTMLVideoElement>;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <TheosPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" width="100%" color="#0542d5" title="Radio Splash TV - LIVE!" />
    </>
  );
}
