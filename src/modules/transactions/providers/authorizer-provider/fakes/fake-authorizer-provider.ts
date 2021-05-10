import { IAuthorizerProvider } from "../contracts/iauthorizer-provider";

class FakeAuthorizerProvider implements IAuthorizerProvider {
  async isAuthorized(): Promise<boolean> {
    return true;
  }
}

export { FakeAuthorizerProvider };
