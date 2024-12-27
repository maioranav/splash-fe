import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CustomHeader } from "./components/header/CustomHeader";
import { CustomFooter } from "./components/footer/CustomFooter";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radio Splash | Play My Music!",
  description:
    "Sito Web di Radio Splash! Ascolta la diretta web o riascolta gli appuntamenti con Splash Replay! Seguici sui social e condividi la nostra musica",
  creator: "Vincenzo Maiorana",
  keywords: "radio, splash, splash replay, musica, ascolto, appuntamenti, social",
  icons: [],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${montserratSans.variable}`}>
        <header>
          <CustomHeader />
        </header>
        <main>{children}</main>
        <footer>
          <CustomFooter />
        </footer>
      </body>
    </html>
  );
}
