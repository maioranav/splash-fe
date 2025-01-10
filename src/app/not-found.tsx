"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  let timeout;

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
    return clearTimeout(timeout);
  }, []);

  return (
    <div className="not-found-page">
      <span>404</span>
      <span>&nbsp;| La pagina che cerchi non esiste!!!</span>
    </div>
  );
}
