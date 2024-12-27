"use client";
import "./CustomHeader.css";

export const CustomHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="navbar-brand-image" src="/imgs/logo_splash_tr.webp" alt="Radio Splash" />
          </a>
          <div className="collapse navbar-collapse w-100" id="navbarToggler">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  TV
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Staff
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Palinsesto
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contatti
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
