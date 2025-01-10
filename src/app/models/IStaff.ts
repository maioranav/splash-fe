import { SocialContacts } from "./ISocial";
import { Ruoli } from "./Ruoli.enum";
import { IShow } from "./IShow";

export interface IStaff {
  id?: string;
  nome: string;
  ruolo: Ruoli;
  img?: string;
  social?: SocialContacts;
  programmi?: IShow[];
}
