"use client";
import { MutableRefObject, useRef } from "react";

export let playerRef!: MutableRefObject<HTMLAudioElement | undefined>;

export const AudioPlayer = () => {
  playerRef = useRef(typeof Audio !== "undefined" ? new Audio(process.env.NEXT_PUBLIC_BASE_AUDIO_STREAM + "/stream") : undefined);
  return <></>;
};
