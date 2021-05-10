import { IHashProvider } from "../contracts/ihash-provider";

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
}

export { FakeHashProvider };
