import { SocialContacts } from "./ISocial";
import { Ruoli } from "./Ruoli.enum";
import { IShow } from "./IShow";

export interface IStaff {
  nome: string;
  ruolo: Ruoli;
  img?: string;
  social?: SocialContacts;
  programmi?: IShow[];
}
