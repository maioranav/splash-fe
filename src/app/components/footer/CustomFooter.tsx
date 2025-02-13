import "./CustomFooter.scss";

export const CustomFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div className="row position-fixed bottom-0 m-0 p-0 w-100 d-flex flex-wrap footer-content">
      <div className="col-12 col-md-7 bg-secondary d-flex justify-content-end align-items-center py-3">
        <p className="m-0 p-0 text-light small">Radio Splash &copy; {year} | Tutti i diritti riservati | Safer Srl | P.IVA: 02055490839</p>
      </div>
      <div className="col-12 col-md-5 text-start bg-primary text-light d-none d-sm-flex aling-items-center py-3">
        <p className="m-0 p-0 small">
          Powered by:{" "}
          <a href="https://www.vincenzomaiorana.it" className="text-light text-decoration-none" target="_blank" rel="noopener">
            Vincenzo Maiorana
          </a>
          ,&nbsp;
          <a href="https://www.vincenzocarcione.com" target="_blank" rel="noopener" className="text-light text-decoration-none">
            Vincenzo Carcione
          </a>
        </p>
      </div>
    </div>
  );
};
