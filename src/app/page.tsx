import RadioPlayer from "./components/RadioPlayer/RadioPlayer";
import Image from "next/image";
import TvPlayer from "./components/TvPlayer/TvPlayer";
import styles from "./page.module.scss";
import appstore from "../../public/assets/appstore_359x93.png";
import playstore from "../../public/assets/googleplay_359x93.png";

export default function Home() {
  const tvOptions = {
    autoplay: false,
    controls: true,
    responsive: false,
    fluid: false,
    fill: true,
    poster: process.env.NEXT_PUBLIC_BASE_URL + "/onairtv/splashstarttv.jpg",
    sources: [
      {
        src: process.env.NEXT_PUBLIC_BASE_VIDEO_STREAM || "",
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <>
      <main>
        <section className="bg-body-tertiary pt-5">
          <div className="container">
            <div className="row mt-4">
              <h2 className="text-center my-5">
                <span className={styles.evidenziaprimary}>La Radio</span> in continua <span className={styles.underlined}>evoluzione</span>!
              </h2>
              <h5 className="text-center">Ascoltaci in Live Streaming o Guardaci sulla nostra Splash TV!</h5>
            </div>
            <div className="row">
              <div className="col-12 col-lg-6 p-4">
                <RadioPlayer />
              </div>
              <div className="col-12 col-lg-6 p-4">
                <TvPlayer options={tvOptions} />
              </div>
            </div>
            <div className="row py-5 my-5">
              <h3 className="d-flex justify-content-center align-items-center flex-wrap w-100 my-4">
                Portaci sempre con te
                <span className="ms-2 p-3 bg-warning fw-bold">SCARICA L&apos;APP! </span>
              </h3>
              <div className="d-flex justify-content-center flex-wrap">
                <a href="https://apps.apple.com/it/app/radio-splash-app-ufficiale/id1463380760" target="_blank">
                  <Image
                    className="m-3 rounded-2"
                    src={appstore.src}
                    height={53}
                    width={200}
                    alt="Scarica l'app su App Store"
                    style={{ outline: "2px solid var(--bs-warning)", outlineOffset: "3px" }}
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.inmystream.radiosplash&hl=it&gl=US" target="_blank">
                  <Image
                    className="m-3 rounded-2"
                    src={playstore.src}
                    height={53}
                    width={200}
                    alt="Scarica l'app su Google Play"
                    style={{ outline: "2px solid var(--bs-primary)", outlineOffset: "3px", MozOutlineRadius: "15px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="container h-100 d-flex align-items-center">
            <div className="row h-100">
              <div id="anni70" className="col-12 col-lg-6 h-100 d-flex flex-column justify-content-center py-5">
                <h2 className="m-0">
                  <span className="bg-primary p-3 text-light mb-2">Una lunghissima passione:</span>
                </h2>
                <h3 className="m-0 p-3 mb-4">
                  <span className="bg-warning p-3 fw-bold">LA RADIO!</span>
                </h3>
                <p className="mb-4">
                  La storia di Radio Splash è caratterizzata dalla passione e dalla volontà di evolversi per offrire sempre il meglio a tutti gli
                  ascoltatori, che in più di trent’anni hanno contribuito a costruire la sua identità.
                </p>
                <h5 className="mb-4">
                  <span className="bg-primary text-light p-2">Gli anni &apos;70</span> Le Origini
                </h5>
                <p>
                  Radio Splash nasce nell’anno 1976, dalla passione di Fortunato Grasso, un ragazzino appena dodicenne, che iniziò a sperimentare la
                  trasmissione in modulazione di frequenza con un piccolo trasmettitore autocostruito.
                </p>
                <p>
                  Era il 1977 e sulla frequrenza 106.00 Mhz, Radio Splash diffondeva no stop musica ed intrattenimento per tutta la città di Milazzo.
                </p>
                <p>
                  Grazie ai successivi miglioramenti apportati nell’alta e bassa frequenza, Radio Splash registrava, già nel 1979, una qualità di
                  suono in uscita decisamente professionale.
                </p>
              </div>
              <div className="col-12 col-lg-6 h-100 justify-content-center align-items-center overflow-hidden d-none d-lg-flex">
                <Image
                  width={450}
                  height={450}
                  loading="lazy"
                  className={styles.homeimage}
                  src="https://images.pexels.com/photos/17918902/pexels-photo-17918902/free-photo-of-unitra-dorota-radio-cup-of-coffee-and-dried-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-body-tertiary py-5">
          <div className="container h-100 d-flex align-items-center">
            <div id="anni8090" className="row h-100 w-100">
              <div className="col-12 col-lg-6 d-flex h-100 justify-content-center align-items-center overflow-hidden">
                <Image
                  width={450}
                  height={450}
                  loading="lazy"
                  className={styles.homeimage}
                  src="https://images.pexels.com/photos/302871/pexels-photo-302871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </div>
              <div className="col-12 col-lg-6 h-100 d-flex flex-column justify-content-center py-5">
                <h5 className="mb-4">
                  <span className="bg-primary text-light p-2">Gli anni &apos;80 e &apos;90</span> L&apos;Evoluzione
                </h5>
                <p>
                  La crescente passione per la radio e il desiderio di offrire un servizio qualitativamente elevato, indussero ad effettuare, nel
                  1983, una serie di prove tecniche che permisero di realizzare una performance di equalizzazione e compressione, per un audio in
                  uscita, che differenziò, nell’ambito dell’emittenza locale, la qualità audio di Radio Splash.
                </p>
                <p>
                  Dal 01 Gennaio 1984, si iniziò a trasmettere sulla mitica e storica frequenza dei 98.800 MHZ con un format che fece la differenza,
                  “Musica in Pubblilimit“, che riscosse un notevole successo di pubblico facendo registrare costantemente un crescente numero di
                  ascoltatori. Nascevano così le collaborazioni con le realtà musicali locali. Tra i numerosi partnership, la discoteca Le Cupole di
                  Milazzo, fu senza dubbio la più importante perchè si riuscì a creare una sinergia di intenti che permise di offrire sul territorio
                  l’alternativa che mancava: direttamente dalla discoteca Le Cupole, la musica approdava a Radio Splash.
                </p>
                <p>
                  Gli ulteriori miglioramenti alla bassa frequenza e soprattutto i successivi investimenti sull’alta frequenza divennero d’obbligo nel
                  momento in cui il bacino di utenza di Radio Splash si ampliò con l’acquisizione delle frequenze 95.70 MHZ , 98.950 MHZ e 90.700
                  riuscendo così a servire tutta la costa tirrenica della Sicilia e le Isole Eolie.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="container h-100 d-flex align-items-center">
            <div id="anni2000" className="row h-100 w-100">
              <div className="col-12 col-lg-6 h-100 d-flex flex-column justify-content-center py-5">
                <h5 className="mb-4">
                  <span className="bg-primary text-light p-2">Gli anni 2000</span>
                </h5>
                <p>
                  Il 2000 fu importante per il trasferimento della radio nei nuovi studi più ampi; nacque il primo sito web della radio e lo staff si
                  arricchì di nuovi deejay’s. Nel 2001, l’informazione si rese più capillare grazie ad accordi con agenzie giornalistiche nazionali;
                  arrivò l’sms richiesta, ma la grande novità fu la diretta web, nel maggio del 2003. Radio Splash si manteneva ancora sulla cresta
                  dell’onda camminando di pari passo con i cambiamenti in atto.
                </p>
                <p>
                  Nel 2006, Radio Splash festeggiò 30 anni di musica ed emozioni e regalando ai suoi ascoltatori una migliore copertura della fascia
                  tirrenica con l’acquisto di una nuova frequenza: 92.900 MHZ.{" "}
                </p>
                <p>
                  Il 2009 è stato anche l’anno del nuovo sito web, innovativo nella grafica e nei contenuti con possibilità di più player per
                  l’ascolto on line.
                </p>
                <p>
                  Il 2010 è stato un anno importante per l’ampliamento dell’area di copertura: Radio Splash irradia finalmente la città di Messina e
                  la costa Ionica fino a Taormina con la frequenza FM 96.800 MHZ, un passo importante che porta a migliorare anche la programmazione
                  giornaliera della radio.
                </p>
                <p>2019: Nuovo Sito Web; lancio ufficiale della nuovissima Splash TV, e… Radio Splash è ancora in continua evoluzione.</p>
              </div>
              <div className="col-12 col-lg-6 d-flex h-100 justify-content-center align-items-center overflow-hidden">
                <Image
                  width={450}
                  height={450}
                  loading="lazy"
                  className={styles.homeimage}
                  src="https://images.pexels.com/photos/4889281/pexels-photo-4889281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
