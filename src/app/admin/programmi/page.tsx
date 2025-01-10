"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { useEffect } from "react";
import "./shows.scss";
import { Stinger } from "@/app/components/stinger/Stinger";
import { allShowsFetch } from "@/lib/public-features/showSlice";
import { WeekDayUtils } from "@/app/utils/weekday.service";

export default function AdminProgrammi() {
  const showSlice = useAppSelector((state) => state.shows);
  const nonceSlice = useAppSelector((state) => state.nonce);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nonceSlice?.status === "idle" && nonceSlice.nonce) dispatch(allShowsFetch(nonceSlice.nonce));
  }, [nonceSlice]);

  useEffect(() => {
    if (!nonceSlice || (nonceSlice?.status == "idle" && !nonceSlice?.nonce)) dispatch(feNonceFetch());
  }, []);

  return (
    <div className="container admin-shows-list">
      <Stinger options={{ title: "Programmi", subtitle: "" }} />
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Copertina</th>
            <th scope="col">Titolo</th>
            <th scope="col">Artista</th>
            <th scope="col">Orari</th>
            <th scope="col">Modifica</th>
          </tr>
        </thead>
        <tbody>
          {showSlice?.status === "idle" &&
            showSlice.shows.length > 0 &&
            showSlice.shows.map((el, i) => (
              <tr key={el.id}>
                <th scope="row">{i + 1}</th>
                <td>
                  <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + el.img} alt={el.titolo} className="shows-list-img" />
                </td>
                <td>{el.titolo}</td>
                <td>{el.artista?.nome}</td>
                <td>
                  {el.appuntamenti.map((app, i) => (
                    <p key={el.id + "-" + i}>{`${WeekDayUtils.getWeekDayName(app.giorno)} ${app.inizio} - ${app.fine}`}</p>
                  ))}
                </td>
                <td>
                  <button type="button" className="btn btn-primary" disabled>
                    Modifica
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
