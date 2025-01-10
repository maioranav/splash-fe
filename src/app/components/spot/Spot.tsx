import "./Spot.scss";

export const Spot = () => {
  return (
    <div className="container spot-container">
      <h2>La pubblicità della tua attività in onda</h2>
      <h3>In Radio e in Tv</h3>
      <div className="row flex-wrap-reverse">
        <div className="col-12 col-xl-6 my-3 d-flex flex-column justify-content-center">
          <p>La radio rimane un mezzo pubblicitario che offre diversi vantaggi:</p>
          <ul>
            <li>Costo decisamente più basso rispetto ad altri tipi di media.</li>
            <li>Tempi molto brevi per la completa realizzazione dello spot e per la consecutiva pianificazione.</li>
            <li>Ascolto in contesti diversi (casa, ufficio, locali pubblici…) e in mobilità.</li>
          </ul>
          <p>
            Tutti i nostri <strong>spot pubblicitari</strong> vengono realizzati da uno studio di registrazione nazionale. Il nostro obiettivo rimane
            quello di promuovere l’immagine dei partners attraverso messaggi semplici ed efficaci.
          </p>
          <p>Con Safer S.R.L. potrai usufruire di diversi vantaggi quali ad esempio:</p>
          <ul>
            <li>40 anni di esperienza nel settore.</li>
            <li>Servizio di consulenza personalizzata per identificare la strategia di comunicazione più idonea ed efficace.</li>
            <li>Le più belle voci nazionali per la realizzazione degli spot audio.</li>
            <li>Servizio accurato e professionale di editing e montaggio del messaggio audio.</li>
          </ul>
        </div>
        <div className="col-12 col-xl-6 my-3 d-flex d-sm-none d-xl-flex flex-column justify-content-center">
          <div className="spot-bg-container">
            <div className="spot-bg bg1"></div>
            <div className="spot-bg bg2"></div>
            <div className="spot-bg bg3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
