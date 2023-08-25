"use client";
export default function CustomFooter() {
  return (
    <div className="bg-primary text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col" style={{ fontSize: "0.5rem" }}>
            Radio Splash © {new Date().getFullYear()} | Tutti i diritti riservati | Safer S.R.L. | Partita Iva: 02055490839 | Powered by
            <a href="https://www.vincenzomaiorana.it" target="_blank" className="text-light text-decoration-none">
              &nbsp;Vincenzo Maiorana&nbsp;
            </a>
            and
            <a href="https://www.vincenzocarcione.com" target="_blank" className="text-light text-decoration-none">
              &nbsp;Vincenzo Carcione&nbsp;
            </a>
            | Cookie Policy
          </div>
        </div>
      </div>
    </div>
  );
}
