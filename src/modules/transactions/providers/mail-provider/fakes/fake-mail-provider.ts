/* eslint-disable @typescript-eslint/no-empty-function */
import { IMailProvider } from "../contracts/imail-provider";

class FakeMailProvider implements IMailProvider {
  async notify(): Promise<void> {}
}

export { FakeMailProvider };
