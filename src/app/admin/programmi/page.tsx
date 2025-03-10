"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import "./shows.scss";
import { Stinger } from "@/app/components/stinger/Stinger";
import { allShowsFetch } from "@/lib/public-features/showSlice";
import { WeekDayUtils } from "@/app/utils/weekday.service";
import { IShow } from "@/app/models/IShow";
import { ConfirmModal } from "@/app/components/confirmmodal/ConfirmModal";

export default function AdminProgrammi() {
  const dispatch = useAppDispatch();
  const showSlice = useAppSelector((state) => state.shows);
  const nonceSlice = useAppSelector((state) => state.nonce);
  const authSlice = useAppSelector((state) => state.login);

  const [deleteShow, setDeleteShow] = useState<IShow | null>(null);
  const [deleteShowStatus, setDeleteShowStatus] = useState<"loading" | "success" | "error">("success");

  useEffect(() => {
    if (nonceSlice?.status === "idle" && nonceSlice.nonce) dispatch(allShowsFetch(nonceSlice.nonce));
  }, [nonceSlice]);

  useEffect(() => {
    if (!nonceSlice || (nonceSlice?.status == "idle" && !nonceSlice?.nonce)) dispatch(feNonceFetch());
  }, []);

  const handleDeleteShow = async () => {
    if (!authSlice?.token) setDeleteShowStatus("error");
    try {
      setDeleteShowStatus("loading");
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/programmi/" + deleteShow?.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authSlice?.token}`,
        },
      });
      if (response.ok) {
        setDeleteShowStatus("success");
        setDeleteShow(null);
        dispatch(allShowsFetch(nonceSlice?.nonce ?? ""));
      } else {
        setDeleteShowStatus("error");
        console.error(response);
      }
    } catch (error) {
      setDeleteShowStatus("error");
      console.error(error);
    }
  };

  return (
    <>
      {deleteShow && (
        <ConfirmModal
          cancel={() => {
            setDeleteShow(null);
            setDeleteShowStatus("success");
          }}
          confirm={handleDeleteShow}
          title={"Vuoi eliminare " + deleteShow?.titolo}
          description="Eliminando un programma, eliminerai anche tutti i podcast ad esso associati. Vuoi Continuare?"
          status={deleteShowStatus}
        />
      )}
      <div className="container admin-shows-list position-relative">
        <button
          type="button"
          id="refresh-shows"
          onClick={() => dispatch(allShowsFetch(nonceSlice?.nonce ?? ""))}
          className="btn btn-primary-refresh position-absolute"
          title="Ricarica Programmi"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
        <button
          type="button"
          id="add-show"
          className="btn btn-primary position-absolute"
          onClick={() => redirect("/admin/programmi/new")}
          title="Aggiungi Programma"
        >
          <i className="bi bi-plus"></i>
        </button>
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
                    <button type="button" className="btn btn-primary" onClick={() => redirect("/admin/programmi/" + el.id)}>
                      Modifica
                    </button>
                    <button type="button" title={`Elimina ${el.titolo}`} className="btn btn-danger mx-2" onClick={() => setDeleteShow(el)}>
                      <i className="bi bi-trash" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
