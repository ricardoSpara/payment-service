import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.send("teste");
});

app.listen(3000, () => {
  console.log("App listen on port 3000");
});
