import { IStaff } from "../models/IStaff";
import { NonceService } from "./nonce.service";

export class StaffService {
  private static _instance: StaffService;
  private nonceService: NonceService;

  private constructor() {
    this.nonceService = NonceService.instance;
  }

  public static get instance(): StaffService {
    if (!this._instance) this._instance = new StaffService();
    return this._instance;
  }

  public getAllStaff = async (): Promise<IStaff[]> => {
    try {
      const req = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/staff/all", {
        headers: { "x-fe-nonce": await this.nonceService.getNonce() },
      });
      const data = await req.json();
      return data as IStaff[];
    } catch (e) {
      console.error("Error while fetching staff", e);
      return [];
    }
  };
}
