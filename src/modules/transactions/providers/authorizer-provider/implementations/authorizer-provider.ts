import { AxiosInstance } from "axios";

import { getClientApi } from "@shared/helpers";

import { IAuthorizerProvider } from "../contracts/iauthorizer-provider";

class AuthorizerProvider implements IAuthorizerProvider {
  authorizerService: AxiosInstance;

  constructor() {
    this.authorizerService = getClientApi("https://run.mocky.io");
  }

  async isAuthorized(): Promise<boolean> {
    const { data } = await this.authorizerService.get(
      "/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6"
    );

    if (data?.message === "Autorizado") return true;

    return false;
  }
}

export { AuthorizerProvider };
