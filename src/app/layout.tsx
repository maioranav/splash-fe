import CustomFooter from "./components/CustomFooter/CustomFooter";
import CustomNav from "./components/CustomNav/CustomNav";
import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radio Splash | Play My Music!",
  description:
    "Sito Web di Radio Splash! Ascolta la diretta web o riascolta gli appuntamenti con Splash Replay! Seguici sui social e condividi la nostra musica.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <header className="position-fixed w-100 z-2">
          <CustomNav />
        </header>
        <main>{children}</main>
        <footer>
          <CustomFooter />
        </footer>
      </body>
    </html>
  );
}
