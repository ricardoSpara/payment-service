import { createConnections } from "typeorm";

class Database {
  async init() {
    return createConnections().then(() => {
      console.log("Successfully connected to DB");
    });
  }
}

export default new Database();
