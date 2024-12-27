import "./HomeShows.css";

const data = [
  {
    id: "0fa0a7db-98b0-453f-b560-1a1cd29bbdf3",
    titolo: "Kokaine",
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
    titolo: "Kaffeine",
    img: "f724b7d2-b90b-41e1-adbd-a18b7f52f9c0.jpg",
    artista: {
      id: "e6a6b4c7-fa55-420e-9da5-6291e6a0e234",
      nome: "Vincenzo Maiorana",
      ruolo: "Deejay",
      img: "3irngiefnwoifneoignfewfg.jpg",
    },
    appuntamenti: [
      {
        giorno: "MER",
        inizio: "12.00",
        fine: "13.00",
      },
    ],
  },
];

export const HomeShows = () => {
  return (
    <ul className="home-shows-container d-flex justify-content-between">
      {data.map((el, i) => (
        <li key={i}>
          <img src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + el.img} alt={el.titolo} loading="lazy" />
          <div>
            <h4>{el.titolo}</h4>
            <h5>{el.artista.nome}</h5>
            <h6>
              {el.appuntamenti[0].giorno} {el.appuntamenti[0].inizio} - {el.appuntamenti[0].fine}
            </h6>
          </div>
        </li>
      ))}
    </ul>
  );
};
