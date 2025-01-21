"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Stinger } from "../components/stinger/Stinger";
import { useEffect, useState } from "react";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { IOnAir } from "../components/nowplaying/NowPlaying";
import { allStaffFetch } from "@/lib/public-features/staffSlice";
import { allShowsFetch } from "@/lib/public-features/showSlice";

export default function AdminPage() {
  const globalState = useAppSelector((state) => state);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (globalState?.nonce?.nonce.length == 0 || globalState?.nonce?.status === "failed") {
      dispatch(feNonceFetch());
    }
  }, []);

  useEffect(() => {
    if (globalState?.nonce?.status === "idle" && globalState?.nonce.nonce) {
      dispatch(allStaffFetch(globalState?.nonce.nonce));
      dispatch(allShowsFetch(globalState?.nonce.nonce));
    }
  }, [globalState?.nonce]);

  useEffect(() => {
    if (!globalState?.nonce?.nonce) return;

    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(process.env.NEXT_PUBLIC_BASE_API_URL + "/onair/?nonce=" + globalState?.nonce.nonce);

    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const { title } = JSON.parse(event.data) as IOnAir;
      if (title) setTitle(title);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [globalState?.nonce?.nonce]);

  return (
    <div className="container">
      <Stinger options={{ title: "Dashboard", subtitle: "" }} />
      <div className="row my-5">
        <div className="col-md-12 d-flex gap-3 justify-content-between">
          <div className="card" style={{ minWidth: "20rem" }}>
            <div className="card-body d-flex flex-column align-items-center">
              <h4>Programmi Attivi</h4>
              <p className="display-3">{globalState?.shows?.shows.length}</p>
            </div>
          </div>
          <div className="card" style={{ minWidth: "20rem" }}>
            <div className="card-body d-flex flex-column align-items-center">
              <h4>Ora in onda</h4>
              <p>{title}</p>
            </div>
          </div>
          <div className="card" style={{ minWidth: "20rem" }}>
            <div className="card-body d-flex flex-column align-items-center">
              <h4>Staff attivi in elenco</h4>
              <p className="display-3">{globalState?.staff?.staff.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
