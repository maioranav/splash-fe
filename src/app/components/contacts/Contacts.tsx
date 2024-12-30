import "./Contact.css";
export const Contacts = () => {
  return (
    <div className="contacts-container d-flex my-4 flex-wrap">
      <div className="col-12 col-xs-6 d-flex">
        <i className="bi bi-cursor"></i>
        <div>
          <h6 className="text-primary">SEDE</h6>
          <p>Via Colonnello Bertè, 120 - Milazzo (ME)</p>
        </div>
      </div>
      <div className="col-12 col-xs-6 d-flex">
        <i className="bi bi-phone"></i>
        <div>
          <h6 className="text-primary">TELEFONO</h6>
          <p>
            <a href="tel:+390909281216" target="_blank" rel="noopener" className="text-decoration-none">
              +39 090 928 12 16
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
