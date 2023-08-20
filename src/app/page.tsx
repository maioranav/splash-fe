import { useState } from "react";
import RadioPlayer from "./components/RadioPlayer";
import "./page.module.scss";

export default function Home() {
  return (
    <>
      <main className="container">
        <div className="row">
          <RadioPlayer />
        </div>
      </main>
    </>
  );
}
