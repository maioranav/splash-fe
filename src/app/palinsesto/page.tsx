"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Calendar } from "../components/calendar/Calendar";
import { Stinger } from "../components/stinger/Stinger";
import { IPalinsestoEntry, IShow, IPalinsesto } from "../models/IShow";
import { allShowsFetch } from "@/lib/public-features/showSlice";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { CalendarMobile } from "../components/calendarmobile/CalendarMobile";

export default function Palinsesto() {
  const [palinsesto, setPalinsesto] = useState<IPalinsesto>([]);
  const showSlice = useAppSelector((state) => state.shows);
  const nonceSlice = useAppSelector((state) => state.nonce);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nonceSlice?.status === "idle" && nonceSlice.nonce) dispatch(allShowsFetch(nonceSlice.nonce));
  }, [nonceSlice]);

  useEffect(() => {
    if (!nonceSlice || (nonceSlice?.status == "idle" && !nonceSlice?.nonce)) dispatch(feNonceFetch());
  }, []);

  useEffect(() => {
    if (showSlice?.shows) setPalinsesto(showsMapped(showSlice?.shows));
  }, [showSlice]);

  const stingerOptions = {
    url: "",
    title: "Il nostro staff al completo",
    subtitle: "Seguici sui social",
  };
  const showsMapped = (array: IShow[]) => {
    const palinsesto: IPalinsesto = Array.from({ length: 7 }, () => []);

    array.forEach((programma) => {
      programma.appuntamenti.forEach((appuntamento) => {
        const giornoIndex = appuntamento.giorno - 1; // Converti giorno in indice (0-based)
        const entry: IPalinsestoEntry = {
          titolo: programma.titolo,
          start: appuntamento.inizio,
          end: appuntamento.fine,
        };
        if (programma.artista && programma.artista.nome) {
          entry.artista = programma.artista.nome;
        }
        palinsesto[giornoIndex].push(entry);
      });
    });
    return palinsesto;
  };

  return (
    <div className="container my-5">
      <Stinger options={stingerOptions} />
      <div className={styles.calendarblock}>{palinsesto && palinsesto.length == 7 && <Calendar palinsesto={palinsesto} />}</div>
      {palinsesto && palinsesto.length == 7 && <CalendarMobile palinsesto={palinsesto} />}
    </div>
  );
}
