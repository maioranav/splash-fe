import { Calendar } from "../components/Calendar/Calendar";

export default function Palinsesto() {
  return (
    <>
      <main>
        <section className="bg-body-tertiary pt-5">
          <div className="container">
            <div className="row mt-5"></div>
            <div className="row mt-4 hidden">Questo è il palinsesto di Radio Splash</div>
            <div className="row my-4">
              <Calendar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
