import { IStaff } from "./IStaff";

export type IShow = {
  id: string;
  titolo: string;
  img: string;
  artista?: IStaff;
  appuntamenti: Array<{
    giorno: string;
    inizio: string;
    fine: string;
  }>;
};
