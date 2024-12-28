export class NonceService {
  private static _instance: NonceService;

  public static get instance(): NonceService {
    if (!this._instance) this._instance = new NonceService();
    return this._instance;
  }

  public getNonce = async () => {
    try {
      const req = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/main/title/FRONTEND SECRET NONCE");
      const data = await req.json();
      return data.data as string;
    } catch (e) {
      console.error("Error while fetching nonce", e);
      return "";
    }
  };
}
