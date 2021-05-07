import { Router } from "express";

const usersRoutes = Router();

usersRoutes.get("/", (request, response) => {
  return response.send("ok");
});

export { usersRoutes };
