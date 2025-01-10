import { Calendar } from "../components/calendar/Calendar";
import { Stinger } from "../components/stinger/Stinger";
import { WeekDayUtils } from "../utils/weekday.service";
import palinsesto from "./palinsesto.json";

export interface Programmazione {
  titolo: string;
  start: string;
  end: string;
  artista?: string;
}

export default function Palinsesto() {
  return (
    <div className="container my-5">
      <Stinger options={{ title: "", subtitle: "" }} />
      <div className="row my-4 d-none d-md-block">
        <Calendar data={palinsesto.palinsesto} />
      </div>
      <div className="row my-4 d-block d-md-none palinsesto-mobile">
        <h2 className="fw-bold">Palinsesto</h2>
        {palinsesto.palinsesto.map((el, i) => (
          <>
            <div key={"day-" + i} className="giorno-settimana">
              {WeekDayUtils.getWeekDayName(i + 1)}
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
  );
}
