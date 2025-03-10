"use client";

import { useEffect, useState } from "react";
import { IShow } from "@/app/models/IShow";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Stinger } from "@/app/components/stinger/Stinger";
import "./showeditform.scss";
import { allStaffFetch } from "@/lib/public-features/staffSlice";

export const ShowEditForm = ({ showID }: IShowEditForm) => {
  const dispatch = useAppDispatch();
  const nonceSlice = useAppSelector((state) => state.nonce);
  const authSlice = useAppSelector((state) => state.login);
  const staffSlice = useAppSelector((state) => state.staff);
  const [show, setShow] = useState<IShow>({ appuntamenti: [], titolo: "" });
  const [fetchState, setFetchState] = useState<"idle" | "success" | "error" | "loading">("idle");

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
    console.log(e.currentTarget.value);
    if (e.currentTarget.value) {
      setShow({ ...show, [e.currentTarget.id]: staffSlice?.staff.find((el) => el.id == e.currentTarget.value) });
    } else {
      setShow({ ...show, [e.currentTarget.id]: null });
    }
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
    </>
  );
};

interface IShowEditForm {
  showID: string | null;
}
