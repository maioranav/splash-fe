import { IStaff } from "./IStaff";

export type IShow = {
  id: string;
  titolo: string;
  img: string;
  artista?: IStaff;
  appuntamenti: IAppuntamento[];
};

interface IAppuntamento {
  id: string;
  giorno: number; // Da 1 a 7
  inizio: string; // Formato orario es. "22.00"
  fine: string; // Formato orario es. "23.00"
}

export interface IPalinsestoEntry {
  titolo: string;
  start: string;
  end: string;
  artista?: string; // Opzionale
}

export type IPalinsesto = IPalinsestoEntry[][];
