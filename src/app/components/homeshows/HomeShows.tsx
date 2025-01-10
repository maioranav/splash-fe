"use client";
import React, { useEffect, useState } from "react";
import "./HomeShows.scss";
import { IShow } from "@/app/models/IShow";
import { WeekDayUtils } from "@/app/utils/weekday.service";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";

export const HomeShows = () => {
  const [shows, setShows] = useState<IShow[]>([]);

  const nonceState = useAppSelector((state) => state.nonce);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nonceState?.nonce.length == 0 || nonceState?.status === "failed") {
      dispatch(feNonceFetch());
    }
  }, []);

  const fetchShows = async () => {
    if (!nonceState) return;
    const req = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/programmi/all", {
      headers: {
        "Content-Type": "application/json",
        "X-fe-nonce": nonceState.nonce,
      },
    });
    const data = await req.json();
    setShows(data);
  };

  useEffect(() => {
    fetchShows();
  }, [nonceState?.status]);

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
                    {WeekDayUtils.getWeekDayName(el.appuntamenti[0].giorno)} {el.appuntamenti[0].inizio} - {el.appuntamenti[0].fine}
                  </h6>
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};
