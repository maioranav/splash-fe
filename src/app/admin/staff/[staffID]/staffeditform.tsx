"use client";

import { IStaff } from "@/app/models/IStaff";
import { Ruoli } from "@/app/models/Ruoli.enum";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import "./staffeditform.scss";
import { Stinger } from "@/app/components/stinger/Stinger";

export const StaffEditForm = ({ staffID }: IStaffEditForm) => {
  const nonceSlice = useAppSelector((state) => state.nonce);
  const authSlice = useAppSelector((state) => state.login);
  const [staff, setStaff] = useState<IStaff>({ nome: "", ruolo: Ruoli.DJ });
  const [fetchState, setFetchState] = useState<"idle" | "success" | "error" | "loading">("idle");

  const getStaffData = async (staffID: string) => {
    setFetchState("loading");
    try {
      const request = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/staff/" + staffID, {
        headers: { "Content-Type": "application/json", "x-fe-nonce": nonceSlice?.nonce ?? "" },
      });
      if (request.ok) {
        const data = await request.json();
        setStaff(data);
        setFetchState("idle");
      }
    } catch (err) {
      setFetchState("error");
      console.error(err);
    }
  };

  useEffect(() => {
    if (staffID) getStaffData(staffID);
  }, [staffID]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchState("loading");
    const method = staffID ? "PUT" : "POST";
    try {
      const request = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/staff" + (staffID ? "/" + staffID : ""), {
        method,
        headers: { "Content-Type": "application/json", Authorization: authSlice?.token ?? "" },
        body: JSON.stringify(staff),
      });
      if (request.ok) {
        const data = await request.json();
        if (method == "POST") window.location.replace(`/admin/staff/${data.id}`);
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
    setStaff({ ...staff, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleChangeSocialInput = (e: React.FormEvent<HTMLInputElement>) => {
    setStaff({ ...staff, social: { ...staff.social, [e.currentTarget.id]: e.currentTarget.value ? e.currentTarget.value : null } });
  };

  const handleChangeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setStaff({ ...staff, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleNewSocialInfo = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStaff({ ...staff, social: {} });
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
        setStaff({ ...staff, img: data.filename });
        setFetchState("idle");
      } else {
        setFetchState("error");
      }
    } catch (err) {
      setFetchState("error");
      console.error(err);
    }
  };

  return (
    <>
      <Stinger options={{ title: staff.nome ? staff.nome : "Nuovo Staff", subtitle: staffID ? "modifica" : "creazione" }} />
      <div className="row my-5">
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome">Nome</label>
              <input onChange={handleChangeInput} type="text" className="form-control" id="nome" placeholder="Nome" value={staff.nome} />
            </div>
            <div className="mb-3">
              <label htmlFor="ruolo">Ruolo</label>
              <select onChange={handleChangeSelect} className="form-control mb-3" id="ruolo" title="ruolo" value={staff.ruolo}>
                {Object.values(Ruoli).map((key) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
            </div>
            {staffID && staff.social && (
              <>
                <div className="mb-3">
                  <label htmlFor="instagram">Instagram</label>
                  <input
                    onChange={handleChangeSocialInput}
                    type="text"
                    className="form-control"
                    id="instagram"
                    placeholder="Instagram"
                    value={staff.social.instagram || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="facebook">Facebook</label>
                  <input
                    onChange={handleChangeSocialInput}
                    type="text"
                    className="form-control"
                    id="facebook"
                    placeholder="Facebook"
                    value={staff.social.facebook || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="sitoweb">Sito web</label>
                  <input
                    onChange={handleChangeSocialInput}
                    type="text"
                    className="form-control"
                    id="sitoweb"
                    placeholder="Sito web"
                    value={staff.social.sitoweb || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="youtube">Youtube</label>
                  <input
                    onChange={handleChangeSocialInput}
                    type="text"
                    className="form-control"
                    id="youtube"
                    placeholder="Youtube"
                    value={staff.social.youtube || ""}
                  />
                </div>
              </>
            )}
            <div className="mb-3 d-flex gap-3">
              {staffID && !staff.social && (
                <button type="button" className="btn btn-primary-outline" onClick={handleNewSocialInfo}>
                  Aggiungi Social
                </button>
              )}
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
          {staffID && staff.img && (
            <>
              <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + staff.img} alt={staff.nome} className="staff-edit-img" />
              <div className="position-absolute w-100 d-flex top-0 change-staff-img" onClick={() => document.getElementById("imageUpload")?.click()}>
                Cambia immagine
              </div>
            </>
          )}
          {staffID && !staff.img && (
            <button className="btn btn-primary" onClick={() => document.getElementById("imageUpload")?.click()} title="Aggiungi immagine">
              Aggiungi immagine
            </button>
          )}
        </div>
      </div>
    </>
  );
};

interface IStaffEditForm {
  staffID: string | null;
}
