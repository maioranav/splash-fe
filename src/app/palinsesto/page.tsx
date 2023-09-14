import { Calendar } from "../components/Calendar/Calendar";
import palinsesto from "../../../public/palinsesto.json";
import { eachDayOfInterval, format, getWeek } from "date-fns";
import { it } from "date-fns/locale";

export interface Programmazione {
  titolo: string;
  start: string;
  end: string;
  artista?: string;
}

export default function Palinsesto() {
  const weekdays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

  return (
    <>
      <main>
        <section className="bg-body-tertiary pt-5">
          <div className="container">
            <div className="row mt-5"></div>
            <div className="row mt-4 hidden">Scopri la programmazione settimanale di Radio Splash</div>
            <div className="row my-4 d-none d-md-block">
              <Calendar data={palinsesto.palinsesto} />
            </div>
            <div className="row my-4 d-block d-md-none palinsesto-mobile">
              <h2 className="fw-bold">Palinsesto</h2>
              {palinsesto.palinsesto.map((el, i) => (
                <>
                  <div key={"day-" + i} className="giorno-settimana">
                    {weekdays[i]}
                  </div>
                  <ul className="settimana">
                    {el.map((p, pi) => (
                      <li key={"prog-" + pi + "-wd-" + i} className="programma">
                        <div className="titolo">{p.titolo}</div>
                        {p.artista && <div className="artista">{p.artista}</div>}
                        <div className="orario">
                          {p.start} - {p.end}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
