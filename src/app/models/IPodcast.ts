import { IShow } from "./IShow";

export interface IPodcast {
  id?: string;
  img?: string;
  programma: IShow;
  sessioni: IPodcastSession[];
}

export interface IPodcastSession {
  id?: string;
  num: number; //Sequenziale puntata
  url: string;
}
