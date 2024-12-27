import React from "react";
import "./HomeShows.css";

const data = [
  {
    id: "0fa0a7db-98b0-453f-b560-1a1cd29bbdf3",
    titolo: "Kokaine 1",
    img: "f724b7d2-b90b-41e1-adbd-a18b7f52f9c0.jpg",
    artista: {
      id: "e6a6b4c7-fa55-420e-9da5-6291e6a0e234",
      nome: "Vincenzo Maiorana",
      ruolo: "Deejay",
      img: "3irngiefnwoifneoignfewfg.jpg",
    },
    appuntamenti: [
      {
        giorno: "LUN",
        inizio: "11.00",
        fine: "12.00",
      },
    ],
  },
  {
    id: "642a4787-35ec-4859-b534-d102034eb4e5",
    titolo: "Kaffeine 2",
    img: "f724b7d2-b90b-41e1-adbd-a18b7f52f9c0.jpg",
    appuntamenti: [],
  },
  {
    id: "642a4787-35ec-4859-b534-d102034eb4e5",
    titolo: "Kaffeine 3",
    img: "f724b7d2-b90b-41e1-adbd-a18b7f52f9c0.jpg",
    appuntamenti: [
      {
        giorno: "LUN",
        inizio: "11.00",
        fine: "12.00",
      },
    ],
  },
  {
    id: "642a4787-35ec-4859-b534-d102034eb4e5",
    titolo: "Kaffeine 4",
    img: "f724b7d2-b90b-41e1-adbd-a18b7f52f9c0.jpg",
    artista: {
      id: "e6a6b4c7-fa55-420e-9da5-6291e6a0e234",
      nome: "Vincenzo Maiorana",
      ruolo: "Deejay",
      img: "3irngiefnwoifneoignfewfg.jpg",
    },
    appuntamenti: [
      {
        giorno: "LUN",
        inizio: "11.00",
        fine: "12.00",
      },
    ],
  },
];

export const HomeShows = () => {
  return (
    <ul className="home-shows-container d-flex justify-content-between">
      {data.map((el, i) => (
        <React.Fragment key={i}>
          {el.appuntamenti[0] && (
            <li>
              <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + el.img} alt={el.titolo} loading="lazy" />
              <div>
                <h4>{el.titolo}</h4>
                {el.artista && <h5>{el.artista.nome}</h5>}
                <h6>
                  {el.appuntamenti[0].giorno} {el.appuntamenti[0].inizio} - {el.appuntamenti[0].fine}
                </h6>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};
