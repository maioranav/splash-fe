"use client";
import { useEffect, useState } from "react";

export const ScrollLogo = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      // Calcola la nuova altezza massima basata sulla posizione dello scroll
      timeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const newPosition = Math.min(300, 100 + scrollPosition / 2); // esempio dinamico
        setPosition(newPosition);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup per rimuovere il listener quando il componente viene smontato
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scorrimento fluido
    });
  };

  return (
    <>
      {position > 100 && (
        <style>
          {`.navbar-brand-image {
                  max-height: 30px !important;
               }`}
        </style>
      )}
      <div>
        <button
          onClick={scrollToTop}
          type="button"
          title="Go Top!"
          className="go-top-btn"
          style={position > 100 ? { opacity: 1, bottom: "50px", right: "50px" } : {}}
        >
          <i className="bi bi-arrow-down-square-fill"></i>
        </button>
      </div>
    </>
  );
};
