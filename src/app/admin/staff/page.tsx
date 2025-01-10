"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { allStaffFetch } from "@/lib/public-features/staffSlice";
import { useEffect } from "react";
import "./staff.scss";
import { Stinger } from "@/app/components/stinger/Stinger";

export default function AdminStaff() {
  const staffSlice = useAppSelector((state) => state.staff);
  const nonceSlice = useAppSelector((state) => state.nonce);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nonceSlice?.status === "idle" && nonceSlice.nonce) dispatch(allStaffFetch(nonceSlice.nonce));
  }, [nonceSlice]);

  useEffect(() => {
    if (!nonceSlice || (nonceSlice?.status == "idle" && !nonceSlice?.nonce)) dispatch(feNonceFetch());
  }, []);

  return (
    <div className="container admin-staff-list">
      <Stinger options={{ title: "Staff", subtitle: "" }} />
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Img</th>
            <th scope="col">Nome</th>
            <th scope="col">Ruolo</th>
            <th scope="col">Act.Shows</th>
            <th scope="col">Modifica</th>
          </tr>
        </thead>
        <tbody>
          {staffSlice?.status === "idle" &&
            staffSlice.staff.length > 0 &&
            staffSlice.staff.map((el, i) => (
              <tr key={el.id}>
                <th scope="row">{i + 1}</th>
                <td>
                  <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + el.img} alt={el.nome} className="staff-list-img" />
                </td>
                <td>{el.nome}</td>
                <td>{el.ruolo}</td>
                <td>{el.programmi?.length || 0}</td>
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
