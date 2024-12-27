export type IShow = {
  id: string;
  titolo: string;
  img: string;
  artista?: {
    id: string;
    nome: string;
    ruolo: string;
    img: string;
  };
  appuntamenti: Array<{
    giorno: string;
    inizio: string;
    fine: string;
  }>;
};
