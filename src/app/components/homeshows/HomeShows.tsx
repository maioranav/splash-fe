"use client";
import React, { useEffect, useState } from "react";
import "./HomeShows.css";
import { IShow } from "@/app/models/IShow";

export const HomeShows = (props: IHomeShows) => {
  const [shows, setShows] = useState<IShow[]>([]);

  const fetchShows = async () => {
    const req = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/programmi/all", {
      headers: {
        "Content-Type": "application/json",
        "X-fe-nonce": props.nonce,
      },
    });
    const data = await req.json();
    setShows(data);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <ul className="home-shows-container d-flex justify-content-between">
      {shows.length > 0 &&
        shows.map((el, i) => (
          <React.Fragment key={i}>
            {el.appuntamenti[0] && (
              <li>
                <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + el.img} alt={el.titolo} loading="lazy" />
                <div>
                  <h4>{el.titolo}</h4>
                  {el.artista && <h5>{el.artista.nome}</h5>}
                  <h6>
                    {el.appuntamenti[0].giorno} {el.appuntamenti[0].inizio} - {el.appuntamenti[0].fine}
                  </h6>
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};

interface IHomeShows {
  nonce: string;
}
