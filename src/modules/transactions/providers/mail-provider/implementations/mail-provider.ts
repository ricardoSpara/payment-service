import { AxiosInstance } from "axios";

import { getClientApi } from "@shared/helpers";

import { IMailProvider } from "../contracts/imail-provider";

class MailProvider implements IMailProvider {
  mailService: AxiosInstance;

  constructor() {
    this.mailService = getClientApi(String(process.env.MAIL_ROUTE));
  }

  async notify(): Promise<void> {
    try {
      await this.mailService.get("/notify");
    } catch (err) {
      console.error("Error notifying", err.message);
    }
  }
}

export { MailProvider };
