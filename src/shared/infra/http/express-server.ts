import express, { Response, Request, NextFunction, Express } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/app-error";

import "express-async-errors";

import swaggerFile from "../../../../swagger.json";
import Database from "../database";
import { router } from "./routes";

class App {
  private server: Express;

  constructor() {
    this.server = express();
  }

  async init(): Promise<Express> {
    await Database.init();

    this.routes();
    this.errorHandler();

    return this.server;
  }

  errorHandler(): void {
    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response
            .status(err.statusCode)
            .json({ status: "error", message: err.message });
        }

        return response
          .status(500)
          .json({ status: "error", message: err.message });
      }
    );
  }

  routes(): void {
    this.server.use(express.json());
    this.server.use(router);
    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }
}

export default new App();
