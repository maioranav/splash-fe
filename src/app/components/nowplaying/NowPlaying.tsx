"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CoverArt } from "../coverart/CoverArt";
import "./NowPlaying.scss";
import { TitleComponent } from "./TitleComponent";
import { useEffect } from "react";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
export const NowPlaying = () => {
  const nonceState = useAppSelector((state) => state.nonce);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nonceState?.nonce.length == 0 || nonceState?.status === "failed") {
      dispatch(feNonceFetch());
    }
  }, []);

  return (
    <>
      {nonceState?.status == "idle" && nonceState.nonce && (
        <div className="col-12 col-md-6 col-xxl-9 m-0 dynamic-background">
          <div className="content d-flex flex-column h-100 justify-content-center p-2 p-lg-5">
            <div className="my-3">
              <i className="bi bi-play-fill me-2 text-primary"></i>
              <span>Now Playing</span>
            </div>
            <p className="my-2 mb-5 display-4 text-uppercase">
              <TitleComponent nonce={nonceState.nonce} />
            </p>
            <audio src={process.env.NEXT_PUBLIC_BASE_AUDIO_STREAM} controls />
            <CoverArt embed={true} />
            <p className="mt-5 mb-2">Scarica l&apos;app di RadioSplash, portaci sempre con te!</p>
          </div>
          <div className="background bg1"></div>
          <div className="background bg2"></div>
          <div className="background bg3"></div>
        </div>
      )}
    </>
  );
};
