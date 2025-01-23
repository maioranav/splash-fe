"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.scss";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { CustomNavLink } from "../components/header/CustomNavLink";
import { cleanToken } from "@/lib/admin-features/loginSlice";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const login = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const routes = [
    { path: "/admin", name: "Dashboard", icon: "house-door" },
    { path: "/admin/staff", name: "Staff", icon: "people" },
    { path: "/admin/programmi", name: "Programmi", icon: "calendar-week" },
    { path: "/admin/config", name: "Configurazioni", icon: "sliders" },
  ];

  useEffect(() => {
    if (!login?.token) redirect("/login");
  }, []);

  useEffect(() => {
    if (login?.status == "failed") redirect("/login");
  }, [login?.status]);

  const handleLogout = () => {
    dispatch(cleanToken());
    redirect("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-body-tertiary admin-navbar">
        <div className="container-fluid">
          {
            // eslint-disable-next-line @next/next/no-html-link-for-pages
            <a className="navbar-brand" href="/">
              Torna al sito
            </a>
          }
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              {routes.map((route, i) => (
                <CustomNavLink key={i} linkmeta={route} />
              ))}
              <li className="nav-item">
                <button type="button" className="nav-link" title="Logout" onClick={handleLogout}>
                  <i className="bi bi-door-open" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
