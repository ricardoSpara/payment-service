import express, { Response, Request, NextFunction, Express } from "express";

import "express-async-errors";

import { router } from "./routes";

class App {
  private server: Express;

  constructor() {
    this.server = express();
  }

  async init(): Promise<Express> {
    this.routes();
    this.errorHandler();

    return this.server;
  }

  errorHandler(): void {
    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        return response
          .status(500)
          .json({ status: "error", message: err.message });
      }
    );
  }

  routes(): void {
    this.server.use(express.json());
    this.server.use(router);
  }
}

export default new App();
