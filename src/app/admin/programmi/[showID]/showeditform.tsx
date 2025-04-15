"use client";

import { useEffect, useState } from "react";
import { IAppuntamento, IShow } from "@/app/models/IShow";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Stinger } from "@/app/components/stinger/Stinger";
import "./showeditform.scss";
import { allStaffFetch } from "@/lib/public-features/staffSlice";
import { WeekDayUtils } from "@/app/utils/weekday.service";

export const ShowEditForm = ({ showID }: IShowEditForm) => {
  const dispatch = useAppDispatch();
  const nonceSlice = useAppSelector((state) => state.nonce);
  const authSlice = useAppSelector((state) => state.login);
  const staffSlice = useAppSelector((state) => state.staff);
  const [show, setShow] = useState<IShow>({ appuntamenti: [], titolo: "" });
  const [fetchState, setFetchState] = useState<"idle" | "success" | "error" | "loading">("idle");
  const [appointmentState, setAppointmentState] = useState<"idle" | "success" | "error" | "loading">("idle");
  const [newAppointment, setNewAppointment] = useState<IAppuntamento>({
    giorno: 1,
    inizio: "",
    fine: "",
  });

  const getShowData = async (showID: string) => {
    setFetchState("loading");
    try {
      const request = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/programmi/" + showID, {
        headers: { "Content-Type": "application/json", "x-fe-nonce": nonceSlice?.nonce ?? "" },
      });
      if (request.ok) {
        const data = await request.json();
        setShow(data);
        setFetchState("idle");
      }
    } catch (err) {
      setFetchState("error");
      console.error(err);
    }
  };

  useEffect(() => {
    if (showID) getShowData(showID);
  }, [showID]);

  useEffect(() => {
    if (!staffSlice?.staff.length && nonceSlice?.nonce) dispatch(allStaffFetch(nonceSlice.nonce));
  }, [showID, nonceSlice]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchState("loading");
    const method = showID ? "PUT" : "POST";
    try {
      const request = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/programmi" + (showID ? "/" + showID : ""), {
        method,
        headers: { "Content-Type": "application/json", Authorization: authSlice?.token ?? "" },
        body: JSON.stringify(show),
      });
      if (request.ok) {
        const data = await request.json();
        if (method == "POST") window.location.replace(`/admin/programmi/${data.id}`);
        else setFetchState("success");
      } else {
        setFetchState("error");
      }
    } catch (err) {
      setFetchState("error");
      console.error(err);
    }
  };

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setShow({ ...show, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setFetchState("loading");
    try {
      const request = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads", {
        method: "POST",
        headers: { Authorization: authSlice?.token ?? "" },
        body: formData,
      });
      if (request.ok) {
        const data = await request.json();
        setShow({ ...show, img: data.filename });
        setFetchState("idle");
      } else {
        setFetchState("error");
      }
    } catch (err) {
      setFetchState("error");
      console.error(err);
    }
  };

  const handleChangeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value) {
      setShow({ ...show, [e.currentTarget.id]: staffSlice?.staff.find((el) => el.id == e.currentTarget.value) });
    } else {
      setShow({ ...show, [e.currentTarget.id]: null });
    }
  };

  const handleAppointmentChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewAppointment({ ...newAppointment, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleAddAppointment = async () => {
    if (!showID) return;

    setAppointmentState("loading");
    try {
      const request = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/appuntamenti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authSlice?.token ?? "",
        },
        body: JSON.stringify({
          programma: { id: showID },
          ...newAppointment,
        }),
      });

      if (request.ok) {
        const createdAppointment = await request.json();
        setShow({
          ...show,
          appuntamenti: [...(show.appuntamenti || []), createdAppointment],
        });
        setNewAppointment({ giorno: 1, inizio: "", fine: "" });
        setAppointmentState("success");
        setTimeout(() => setAppointmentState("idle"), 2000);
      } else {
        setAppointmentState("error");
      }
    } catch (err) {
      console.error(err);
      setAppointmentState("error");
    }
  };

  const handleRemoveAppointment = (index: number) => {
    setShow({
      ...show,
      appuntamenti: show.appuntamenti.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <Stinger options={{ title: show.titolo ? show.titolo : "Nuovo Programma", subtitle: showID ? "modifica" : "creazione" }} />
      <div className="row my-5">
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome">Titolo</label>
              <input onChange={handleChangeInput} type="text" className="form-control" id="titolo" placeholder="Titolo" value={show.titolo} />
            </div>
            <div className="mb-3">
              <label htmlFor="artista">Ruolo</label>
              <select onChange={handleChangeSelect} className="form-control mb-3" id="artista" title="artista" value={show.artista?.id || ""}>
                <option value="">Nessun Artista</option>
                {staffSlice?.staff &&
                  staffSlice.staff.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.nome}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3 d-flex gap-3">
              <button type="submit" className="btn btn-primary" disabled={fetchState == "loading"}>
                Salva Modifiche
              </button>
            </div>
            {fetchState == "error" && (
              <div className="alert alert-danger" role="alert" aria-label="Alert">
                Qualcosa è andato storto!
              </div>
            )}
            {fetchState == "success" && (
              <div className="alert alert-success" role="alert" aria-label="Alert">
                Salvataggio riuscito!
              </div>
            )}
            {fetchState == "loading" && <div className="spinner-border text-primary" role="status"></div>}
          </form>
        </div>
        <div className="col-4 position-relative p-0">
          <input id="imageUpload" title="Immagine di Profilo" type="file" onChange={handleFileChange} />
          {showID && show.img && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + show.img} alt={show.titolo} className="show-edit-img" />
              <div className="position-absolute w-100 d-flex top-0 change-show-img" onClick={() => document.getElementById("imageUpload")?.click()}>
                Cambia immagine
              </div>
            </>
          )}
          {showID && !show.img && (
            <button className="btn btn-primary" onClick={() => document.getElementById("imageUpload")?.click()} title="Aggiungi immagine">
              Aggiungi immagine
            </button>
          )}
        </div>
      </div>
      {showID && (
        <div className="row my-4">
          <h3>Gestione Appuntamenti</h3>
          <div className="col-12 appointment-form">
            <div className="d-flex gap-3 align-items-end">
              <div className="mb-3">
                <label htmlFor="giorno">Giorno</label>
                <select id="giorno" className="form-select" value={newAppointment.giorno} onChange={handleAppointmentChange}>
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <option key={day} value={day}>
                      {WeekDayUtils.getWeekDayName(day)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inizio">Orario Inizio</label>
                <input
                  type="text"
                  id="inizio"
                  className="form-control"
                  placeholder="hh.mm"
                  value={newAppointment.inizio}
                  onChange={handleAppointmentChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fine">Orario Fine</label>
                <input
                  type="text"
                  id="fine"
                  className="form-control"
                  placeholder="hh.mm"
                  value={newAppointment.fine}
                  onChange={handleAppointmentChange}
                />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <button type="button" className="btn btn-primary mb-3" onClick={handleAddAppointment} disabled={appointmentState === "loading"}>
                  Aggiungi Appuntamento
                </button>
                {appointmentState === "loading" && <div className="spinner-border spinner-border-sm text-primary mb-3" role="status"></div>}
                {appointmentState === "success" && <div className="text-success mb-3">✓ Salvato</div>}
                {appointmentState === "error" && <div className="text-danger mb-3">Errore nel salvataggio</div>}
              </div>
            </div>

            {show.appuntamenti?.length > 0 && (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Giorno</th>
                    <th>Inizio</th>
                    <th>Fine</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {show.appuntamenti?.map((app, index) => (
                    <tr key={index}>
                      <td>{WeekDayUtils.getWeekDayName(app.giorno)}</td>
                      <td>{app.inizio}</td>
                      <td>{app.fine}</td>
                      <td>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveAppointment(index)}>
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
};

interface IShowEditForm {
  showID: string | null;
}
