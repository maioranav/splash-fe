"use client";
import { useEffect, useState } from "react";
import "./Calendar.scss";
import bepalinsesto from "../../../../public/palinsesto.json";

export const Calendar = () => {
  const [hasTableBeenGenerated, setTableBeenGenerated] = useState(false);

  const generateTableStructure = (hoursOfDay: number, daysOfWeek: number) => {
    let hours = "";
    for (let i = 0; i < hoursOfDay * 2; i++) {
      const isEven = i % 2 == 0;
      hours += `<tr id="h${isEven ? i / 2 : ""}">`;
      let hoursHead = isEven ? `<th className="headcol" >${i / 2}.00</th>` : `<th className="headcol"></th>`;
      hours += hoursHead;
      let days = "";
      for (let e = 0; e < daysOfWeek; e++) {
        days += `<td class="d${e}"></td>`;
      }
      hours += days;
      hours += "</tr>";
    }
    return hours;
  };

  const generateContent = async () => {
    const palinsesto = bepalinsesto.palinsesto;
    for (let d = 0; d < palinsesto.length; d++) {
      for (let el = 0; el < palinsesto[d].length; el++) {
        let startTime = parseInt(palinsesto[d][el].start.split(".")[0]);
        if (parseInt(palinsesto[d][el].start.split(".")[1]) > 0) startTime += 0.5;
        let endTime = parseInt(palinsesto[d][el].end.split(".")[0]);
        if (parseInt(palinsesto[d][el].end.split(".")[1]) > 0) endTime += 0.5;
        if (endTime == 0) endTime = 24;
        const duration = endTime - startTime;
        const height = duration * 220;
        const branch = document.querySelector(`.bodyCalendar #h${startTime} .d${d}`);
        if (branch) {
          let toInsert = `<div class='event' style="height: ${height}%;`;
          toInsert += startTime % 1 != 0 ? ` transform: translateY(100%);` : ``;
          toInsert += `"><p class="event-title">${palinsesto[d][el].titolo}</p>`;
          if (palinsesto[d][el].artista) toInsert += `<p class="event-artist">${palinsesto[d][el].artista}</p>`;
          toInsert += `<p class="event-time">${palinsesto[d][el].start} - ${palinsesto[d][el].end}</p></div>`;
          branch.innerHTML = toInsert;
        }
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (globalThis.document) {
      let bodyCalendar = globalThis.document.querySelector(".bodyCalendar");
      if (bodyCalendar) {
        bodyCalendar.innerHTML = generateTableStructure(24, 7);
        setTableBeenGenerated(true);
      }
    }
  });

  useEffect(() => {
    if (!hasTableBeenGenerated) return;
    generateContent();
  }, [hasTableBeenGenerated]);

  return (
    <div className="calendar">
      <div className="outer">
        <div className="wrap">
          <table className="offset">
            <thead>
              <tr>
                <th className="headcol"></th>
                <th>Lunedì</th>
                <th>Martedì</th>
                <th>Mercoledì</th>
                <th>Giovedì</th>
                <th>Venerdì</th>
                <th>Sabato</th>
                <th>Domenica</th>
              </tr>
            </thead>
            <tbody className="bodyCalendar">Loading...</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
