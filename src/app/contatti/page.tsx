import { ContactForm } from "../components/contactform/ContactForm";
import { Contacts } from "../components/contacts/Contacts";
import styles from "./page.module.css";

export default function Contatti() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <ContactForm />
          <Contacts />
        </div>
        <div className="col-12 col-md-6">
          <iframe
            className={styles.contactmap}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            //    src={`https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA`}
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.40530457961003!2d15.239258889220824!3d38.21634109408841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131431ea46cb0ccd%3A0x5b586ed424f0a72b!2sSafer+Srl!5e0!3m2!1sit!2sit!4v1552735500281`}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
