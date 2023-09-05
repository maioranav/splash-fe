"use client";
import { useEffect } from "react";
import "./Calendar.scss";
export const Calendar = () => {
  const generateTableStructure = (hoursOfDay: number, daysOfWeek: number) => {
    let hours = "";
    for (let i = 0; i < hoursOfDay * 2; i++) {
      hours += "<tr>";
      const isEven = i % 2 == 0;
      let hoursHead = isEven ? `<th className="headcol">${i / 2}.00</th>` : `<th className="headcol"></th>`;
      hours += hoursHead;
      let days = "";
      for (let e = 0; e <= daysOfWeek; e++) {
        days += "<td></td>";
      }
      hours += days;
      hours += "</tr>";
    }
    return hours;
  };

  useEffect(() => {
    if (globalThis.document) {
      let bodyCalendar = globalThis.document.querySelector(".bodyCalendar");
      if (bodyCalendar) bodyCalendar.innerHTML = generateTableStructure(24, 7);
    }
  });

  return (
    <>
      <div className="calendar">
        <div className="outer">
          <table>
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
          </table>

          <div className="wrap">
            <table className="offset">
              <tbody className="bodyCalendar">Loading...</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
