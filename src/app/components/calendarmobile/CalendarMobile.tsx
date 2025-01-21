import { IPalinsesto } from "@/app/models/IShow";
import { WeekDayUtils } from "@/app/utils/weekday.service";
import "./CalendarMobile.scss";
import { useState } from "react";

interface CalendarMobileProps {
  palinsesto: IPalinsesto;
}

export const CalendarMobile = ({ palinsesto }: CalendarMobileProps) => {
  const [openDay, setOpenDay] = useState<number | null>(0); // 0 è il lunedì aperto di default

  const toggleDay = (index: number) => {
    setOpenDay(openDay === index ? null : index); // Se il giorno è già aperto, chiudilo, altrimenti aprilo
  };
  return (
    <div className="calendar-mobile">
      {palinsesto.map((el, i) => (
        <div key={"wwekday-" + i}>
          <div
            className="giorno-settimana"
            onClick={() => {
              toggleDay(i);
            }}
          >
            {WeekDayUtils.getWeekDayName(i + 1)} <i className={openDay == i ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"}></i>
          </div>
          <ul className="settimana">
            {el.map((p, pi) => (
              <li key={"prog-" + pi + "-wd-" + i} className={openDay == i ? "programma" : "programma-closed"}>
                <div className="titolo">
                  <i className="bi bi-arrow-right me-2" />
                  {p.titolo}
                </div>
                <div className="orario">
                  {p.start} - {p.end}
                </div>
                {p.artista && <div className="artista">{p.artista}</div>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
