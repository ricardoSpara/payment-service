import "reflect-metadata";
import "dotenv/config";

import "@shared/container";

import ExpressServer from "@shared/infra/http/express-server";

const { APP_PORT } = process.env;

const bootstrap = async () => {
  try {
    ExpressServer.init().then((server) => {
      server.listen(APP_PORT, () => {
        console.log(`App listen on port ${APP_PORT}`);
      });
    });
  } catch (err) {
    console.error("Error starting server", err);
    process.exit(1);
  }
};

bootstrap();
