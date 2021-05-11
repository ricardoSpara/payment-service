import { IAuthorizerProvider } from "../iauthorizer-provider";

class FakeAuthorizerProvider implements IAuthorizerProvider {
  async isAuthorized(): Promise<boolean> {
    return true;
  }
}

export { FakeAuthorizerProvider };
