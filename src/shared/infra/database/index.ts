import { createConnections } from "typeorm";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from "typeorm-transactional-cls-hooked";

class Database {
  async init() {
    return createConnections().then(() => {
      initializeTransactionalContext();
      patchTypeORMRepositoryWithBaseRepository();

      console.log("Successfully connected to DB");
    });
  }
}

export default new Database();
