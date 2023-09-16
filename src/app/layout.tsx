import "./globals.scss";
import type { Metadata } from "next";
import { AudioPlayer } from "./components/AudioPlayer";
import CustomFooter from "./components/CustomFooter/CustomFooter";
import CustomNav from "./components/CustomNav/CustomNav";
import GoTopButton from "./components/GoTopButton/GoTopButton";

export const metadata: Metadata = {
  title: "Radio Splash | Play My Music!",
  description:
    "Sito Web di Radio Splash! Ascolta la diretta web o riascolta gli appuntamenti con Splash Replay! Seguici sui social e condividi la nostra musica.",
  manifest: "/manifest.json",
  themeColor: "#0542d5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="minvh100">
        <AudioPlayer />
        <header className="position-fixed w-100 z-2">
          <CustomNav />
        </header>
        <main>{children}</main>
        <footer>
          <CustomFooter />
        </footer>
        <GoTopButton />
      </body>
    </html>
  );
}
