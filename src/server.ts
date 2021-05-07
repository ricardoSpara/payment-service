import "dotenv/config";

import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.send("teste");
});

const { APP_PORT } = process.env;

app.listen(APP_PORT, () => {
  console.log(`App listen on port ${APP_PORT}`);
});
