"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const login = useAppSelector((state) => state.login);

  useEffect(() => {
    if (!login.token) redirect("/login");
  }, []);

  return <>{children}</>;
}
