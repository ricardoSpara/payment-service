import { hash } from "bcryptjs";

import { IHashProvider } from "../contracts/ihash-provider";

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}

export { BCryptHashProvider };
