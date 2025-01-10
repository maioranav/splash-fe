"use client";

import { useEffect, useState } from "react";

export const TitleComponent = ({ nonce }: ITitleComponent) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(process.env.NEXT_PUBLIC_BASE_API_URL + "/onair/title?nonce=" + nonce);

    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const { content } = JSON.parse(event.data) as IOnAirTitle;
      setTitle(content);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);

  return <>{title}</>;
};

interface ITitleComponent {
  nonce: string;
}

interface IOnAirTitle {
  content: string;
}
