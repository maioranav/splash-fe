import Image from "next/image";
import styles from "./page.module.scss";
import { Calendar } from "../components/Calendar/Calendar";

export default function Palinsesto() {
  return (
    <>
      <main>
        <section className="bg-body-tertiary pt-5">
          <div className="container">
            <div className="row mt-4"></div>
            <div className="row mt-4">Questo è il palinsesto di Radio Splash</div>
            <div className="row my-4">
              <Calendar />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
