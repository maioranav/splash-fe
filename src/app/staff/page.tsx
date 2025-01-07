"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ArtistCard } from "../components/artistcard/ArtistCard";
import { Stinger } from "../components/stinger/Stinger";
import { useEffect } from "react";
import { allStaffFetch } from "@/lib/public-features/staffSlice";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";

export default function Staff() {
  const staffSlice = useAppSelector((state) => state.staff);
  const nonceSlice = useAppSelector((state) => state.nonce);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nonceSlice?.status === "idle" && nonceSlice.nonce) dispatch(allStaffFetch(nonceSlice.nonce));
  }, [nonceSlice]);

  useEffect(() => {
    if (!nonceSlice || (nonceSlice?.status == "idle" && !nonceSlice?.nonce)) dispatch(feNonceFetch());
  }, []);

  const stingerOptions = {
    url: "",
    title: "Il nostro staff al completo",
    subtitle: "Seguici sui social",
  };

  return (
    <>
      <div className="container mt-2" style={{ marginBottom: "6rem" }}>
        <Stinger options={stingerOptions} />
      </div>
      <div className="container my-5 d-flex justify-content-center gap-3 flex-wrap">
        {staffSlice?.status === "idle" &&
          staffSlice.staff.length > 0 &&
          staffSlice.staff.map((el, i) => <ArtistCard artist={el} key={`staff-${i}`} />)}
      </div>
    </>
  );
}
