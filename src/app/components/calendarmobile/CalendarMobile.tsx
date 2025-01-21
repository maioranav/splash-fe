import { IPalinsesto } from "@/app/models/IShow";
import { WeekDayUtils } from "@/app/utils/weekday.service";
import "./CalendarMobile.scss";

interface CalendarMobileProps {
  palinsesto: IPalinsesto;
}

export const CalendarMobile = ({ palinsesto }: CalendarMobileProps) => {
  return (
    <div className="row my-4 d-block d-lg-none calendar-mobile">
      {palinsesto.map((el, i) => (
        <>
          <div key={"wwekday-" + i} className="giorno-settimana">
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
  );
};
