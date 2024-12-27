"use client";
import { useEffect, useState } from "react";
import "./CoverArt.css";
export const CoverArt = ({ nonce, embed = false }: ICoverArt) => {
  const [cover, setCover] = useState("");

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(process.env.NEXT_PUBLIC_BASE_API_URL + "/onair/cover?nonce=" + nonce);

    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const { content } = JSON.parse(event.data) as IOnAirCover;
      setCover(content);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);

  return (
    <div className={embed ? "d-block d-md-none cover-art-embed" : "col-md-6 col-xxl-3 m-0 p-0 d-none d-md-block"}>
      <img className="cover-art-img" src={"data:image/jpeg;base64," + cover} alt="Cover-Art" />
    </div>
  );
};

interface ICoverArt {
  nonce: string;
  embed?: boolean;
}

interface IOnAirCover {
  content: string;
}
