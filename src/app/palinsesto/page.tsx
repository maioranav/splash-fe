import { Calendar } from "../components/Calendar/Calendar";
import palinsesto from "../../../public/palinsesto.json";

export interface Programmazione {
  titolo: string;
  start: string;
  end: string;
  artista?: string;
}

export default function Palinsesto() {
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
            <div className="row my-4 d-block d-md-none">
              <h2 className="fw-bold">Palinsesto</h2>
              {palinsesto.palinsesto.map((el, i) => (
                <>
                  <div key={"day-" + i}>Giorno {i}</div>
                  <ul>
                    {el.map((p, pi) => (
                      <li key={"prog-" + pi + "-wd-" + i}>
                        <div>{p.titolo}</div>
                        {p.artista && <div>{p.artista}</div>}
                        <div>
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
