"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Calendar } from "../components/calendar/Calendar";
import { Stinger } from "../components/stinger/Stinger";
import { IPalinsestoEntry, IShow, IPalinsesto } from "../models/IShow";
import { WeekDayUtils } from "../utils/weekday.service";
import { allShowsFetch } from "@/lib/public-features/showSlice";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { useEffect, useState } from "react";

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
      <div className="row my-5 d-none d-md-block">{palinsesto && palinsesto.length == 7 && <Calendar palinsesto={palinsesto} />}</div>
      {palinsesto && palinsesto.length == 7 && (
        <div className="row my-4 d-block d-md-none palinsesto-mobile">
          <h2 className="fw-bold">Palinsesto</h2>
          {palinsesto.map((el, i) => (
            <>
              <div key={"wwekday-" + i} className="giorno-settimana">
                {WeekDayUtils.getWeekDayName(i + 1)}
              </div>
              <ul className="settimana">
                {el.map((p, pi) => (
                  <li key={"prog-" + pi + "-wd-" + i} className="programma">
                    <div className="titolo">{p.titolo}</div>
                    {p.artista && <div className="artista">{p.artista}</div>}
                    <div className="orario">
                      {p.start} - {p.end}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
