"use client";

import { IStaff } from "@/app/models/IStaff";
import { Ruoli } from "@/app/models/Ruoli.enum";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import "./staffeditform.scss";
import { Stinger } from "@/app/components/stinger/Stinger";

export const StaffEditForm = ({ staffID }: IStaffEditForm) => {
  const nonceSlice = useAppSelector((state) => state.nonce);
  const [staff, setStaff] = useState<IStaff>({ nome: "", ruolo: Ruoli.DJ });

  const getStaffData = async (staffID: string) => {
    const request = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/staff/" + staffID, {
      headers: { "Content-Type": "application/json", "x-fe-nonce": nonceSlice.nonce },
    });
    if (request.ok) {
      const data = await request.json();
      setStaff(data);
    }
  };

  useEffect(() => {
    if (staffID) getStaffData(staffID);
  }, [staffID]);

  return (
    <>
      <Stinger options={{ title: staff.nome ? staff.nome : "Nuovo Staff", subtitle: staff.nome ? "modifica" : "creazione" }} />
      <div className="row my-5">
        <div className="col-8">
          <form>
            <div className="mb-3">
              <label htmlFor="nome">Nome</label>
              <input type="text" className="form-control" id="nome" placeholder="Nome" value={staff.nome} />
            </div>
            <div className="mb-3">
              <label htmlFor="ruolo">Ruolo</label>
              <select className="form-control mb-3" id="ruolo" title="ruolo" value={staff.ruolo}>
                {Object.values(Ruoli).map((key) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
            </div>
            {staffID && staff.social && (
              <>
                <div className="mb-3">
                  <label htmlFor="instagram">Instagram</label>
                  <input type="text" className="form-control" id="instagram" placeholder="Instagram" value={staff.social.instagram} />
                </div>
                <div className="mb-3">
                  <label htmlFor="facebook">Facebook</label>
                  <input type="text" className="form-control" id="facebook" placeholder="Facebook" value={staff.social.facebook} />
                </div>
                <div className="mb-3">
                  <label htmlFor="sitoweb">Sito web</label>
                  <input type="text" className="form-control" id="sitoweb" placeholder="Sito web" value={staff.social.sitoweb} />
                </div>
                <div className="mb-3">
                  <label htmlFor="youtube">Youtube</label>
                  <input type="text" className="form-control" id="youtube" placeholder="Youtube" value={staff.social.youtube} />
                </div>
              </>
            )}
            <div className="mb-3 d-flex gap-3">
              {staffID && !staff.social && (
                <button type="button" className="btn btn-primary-outline">
                  Aggiungi Social
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                Salva Modifiche
              </button>
            </div>
          </form>
        </div>
        <div className="col-4 position-relative p-0">
          {staffID && staff.img && (
            <>
              {/* //TODO: Aggiungere metodo di upload e form-data*/}
              <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + staff.img} alt={staff.nome} className="staff-edit-img" />
              <div className="position-absolute w-100 d-flex top-0 change-staff-img">Cambia immagine</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

interface IStaffEditForm {
  staffID: string | null;
}
