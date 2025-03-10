"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { allStaffFetch } from "@/lib/public-features/staffSlice";
import { useEffect, useState } from "react";
import "./staff.scss";
import { Stinger } from "@/app/components/stinger/Stinger";
import { redirect } from "next/navigation";
import { ConfirmModal } from "@/app/components/confirmmodal/ConfirmModal";
import { IStaff } from "@/app/models/IStaff";

export default function AdminStaff() {
  const staffSlice = useAppSelector((state) => state.staff);
  const nonceSlice = useAppSelector((state) => state.nonce);
  const authSlice = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const [deleteStaff, setDeleteStaff] = useState<IStaff | null>(null);
  const [deleteStaffStatus, setDeleteStaffStatus] = useState<"error" | "loading" | "success">("success");

  useEffect(() => {
    if (nonceSlice?.status === "idle" && nonceSlice.nonce) dispatch(allStaffFetch(nonceSlice.nonce));
  }, [nonceSlice]);

  useEffect(() => {
    if (!nonceSlice || (nonceSlice?.status == "idle" && !nonceSlice?.nonce)) dispatch(feNonceFetch());
  }, []);

  const handleDeleteStaff = async () => {
    if (!authSlice?.token) setDeleteStaffStatus("error");
    try {
      setDeleteStaffStatus("loading");
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/staff/" + deleteStaff?.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authSlice?.token}`,
        },
      });
      if (response.ok) {
        setDeleteStaffStatus("success");
        setDeleteStaff(null);
        dispatch(allStaffFetch(nonceSlice?.nonce ?? ""));
      } else {
        setDeleteStaffStatus("error");
        console.error(response);
      }
    } catch (error) {
      setDeleteStaffStatus("error");
      console.error(error);
    }
  };

  return (
    <>
      {deleteStaff && (
        <ConfirmModal
          cancel={() => {
            setDeleteStaff(null);
            setDeleteStaffStatus("success");
          }}
          confirm={handleDeleteStaff}
          title={"Vuoi eliminare " + deleteStaff?.nome}
          description="Eliminando una persona dello staff, eliminerai anche tutti i programmi ad esso associati. Vuoi Continuare?"
          status={deleteStaffStatus}
        />
      )}
      <div className="container admin-staff-list position-relative">
        <button
          type="button"
          id="refresh-staff"
          onClick={() => dispatch(allStaffFetch(nonceSlice?.nonce ?? ""))}
          className="btn btn-primary-refresh position-absolute"
          title="Ricarica Staff"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
        <button
          type="button"
          id="add-staff"
          className="btn btn-primary position-absolute"
          onClick={() => redirect("/admin/staff/new")}
          title="Aggiungi Staff"
        >
          <i className="bi bi-plus"></i>
        </button>
        <Stinger options={{ title: "Staff", subtitle: "" }} />
        <table className="table my-5">
          <thead className="sticky-top">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Nome</th>
              <th scope="col">Ruolo</th>
              <th scope="col">Act.Shows</th>
              <th scope="col">Modifica / Elimina</th>
            </tr>
          </thead>
          <tbody>
            {staffSlice?.status === "idle" &&
              staffSlice.staff.length > 0 &&
              staffSlice.staff.map((el, i) => (
                <tr key={el.id}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {el.img && <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + el.img} alt={el.nome} className="staff-list-img" />}
                  </td>
                  <td>{el.nome}</td>
                  <td>{el.ruolo}</td>
                  <td>{el.programmi?.length || 0}</td>
                  <td>
                    <button type="button" className="btn btn-primary mx-2" onClick={() => redirect("/admin/staff/" + el.id)}>
                      Modifica
                    </button>
                    <button type="button" title={`Elimina ${el.nome}`} className="btn btn-danger mx-2" onClick={() => setDeleteStaff(el)}>
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
