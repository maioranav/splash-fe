export const CustomFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div className="row position-fixed bottom-0 m-0 p-0 w-100 d-flex flex-wrap">
      <div className="col-12 col-md-7 bg-secondary d-flex justify-content-end align-items-center py-3">
        <p className="m-0 p-0 text-light small">Radio Splash &copy; {year} | Tutti i diritti riservati | Safer Srl | P.IVA: 02055490839</p>
      </div>
      <div className="col-12 col-md-5 text-start bg-primary text-light d-none d-sm-flex aling-items-center py-3">
        <p className="m-0 p-0 small">Powered by: Vincenzo Maiorana, Vincenzo Carcione</p>
      </div>
    </div>
  );
};
