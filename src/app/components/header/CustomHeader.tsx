import "./CustomHeader.css";
import { CustomNavLink } from "./CustomNavLink";

export const CustomHeader = () => {
  const routes = [
    { path: "/", name: "Home", icon: "house-door" },
    { path: "/tv", name: "TV", icon: "tv" },
    { path: "/staff", name: "Staff", icon: "people" },
    { path: "/palinsesto", name: "Palinsesto", icon: "calendar-week" },
    { path: "/replay", name: "Replay", icon: "rewind-circle" },
    { path: "/contatti", name: "Contatti", icon: "envelope-at" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="navbar-brand-image" src="/imgs/logo_splash_tr.webp" alt="Radio Splash" />
          </a>
          <div className="navbar-collapse w-100" id="navbarToggler">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end">
              {routes.map((route, i) => (
                <CustomNavLink key={i} linkmeta={route} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
