"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { feNonceFetch } from "@/lib/public-features/nonceSlice";
import { allPodcastsFetch } from "@/lib/admin-features/podcastSlice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Stinger } from "@/app/components/stinger/Stinger";
import { IPodcast } from "@/app/models/IPodcast";
import { ConfirmModal } from "@/app/components/confirmmodal/ConfirmModal";
import "./podcast.scss";

export default function AdminPodcast() {
  const dispatch = useAppDispatch();
  const nonceSlice = useAppSelector((state) => state.nonce);
  const podcastSlice = useAppSelector((state) => state.podcast);
  const authSlice = useAppSelector((state) => state.login);

  const [deletePodcast, setDeletePodcast] = useState<IPodcast | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<"loading" | "success" | "error">("success");

  useEffect(() => {
    if (!nonceSlice || (nonceSlice?.status == "idle" && !nonceSlice?.nonce)) dispatch(feNonceFetch());
  }, []);

  useEffect(() => {
    if (nonceSlice?.status === "idle" && nonceSlice.nonce) dispatch(allPodcastsFetch(nonceSlice.nonce));
  }, [nonceSlice]);

  const handleDeletePodcast = async () => {
    if (!authSlice?.token || !deletePodcast?.id) return;
    try {
      setDeleteStatus("loading");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/podcast/${deletePodcast.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authSlice.token,
        },
      });
      if (response.ok) {
        setDeleteStatus("success");
        setDeletePodcast(null);
        if (nonceSlice?.nonce) dispatch(allPodcastsFetch(nonceSlice.nonce));
      } else {
        setDeleteStatus("error");
      }
    } catch (error) {
      setDeleteStatus("error");
      console.error(error);
    }
  };

  return (
    <>
      {deletePodcast && (
        <ConfirmModal
          cancel={() => {
            setDeletePodcast(null);
            setDeleteStatus("success");
          }}
          confirm={handleDeletePodcast}
          title={`Vuoi eliminare ${deletePodcast?.programma?.titolo}?`}
          description="Eliminando un podcast, eliminerai anche tutti gli episodi associati. Vuoi continuare?"
          status={deleteStatus}
        />
      )}
      <div className="container admin-podcast-list position-relative">
        <button
          type="button"
          className="btn btn-primary-refresh position-absolute"
          onClick={() => nonceSlice?.nonce && dispatch(allPodcastsFetch(nonceSlice.nonce))}
          title="Ricarica Podcast"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
        <button type="button" className="btn btn-primary position-absolute" onClick={() => redirect("/admin/podcast/new")} title="Aggiungi Podcast">
          <i className="bi bi-plus"></i>
        </button>
        <Stinger options={{ title: "Podcast", subtitle: "" }} />
        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Copertina</th>
              <th scope="col">Programma</th>
              <th scope="col">Episodi</th>
              <th scope="col">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {podcastSlice?.status === "idle" &&
              podcastSlice?.podcasts?.map((el, i) => (
                <tr key={el.id}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {el.img && (
                      <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + el.img} alt={el.programma.titolo} className="podcast-list-img" />
                    )}
                  </td>
                  <td>{el.programma.titolo}</td>
                  <td>{el.sessioni.length}</td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => redirect(`/admin/podcast/${el.id}`)}>
                      Modifica
                    </button>
                    <button
                      type="button"
                      title={`Elimina ${el.programma.titolo}`}
                      className="btn btn-danger mx-2"
                      onClick={() => setDeletePodcast(el)}
                    >
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
