import { TransferMoneyToUserController } from "@modules/transactions/use-cases/transfer-money-to-user/transfer-money-to-user-controller";
import { Router } from "express";

const transactionsRoutes = Router();

const transferMoneyToUserController = new TransferMoneyToUserController();

transactionsRoutes.post("/", transferMoneyToUserController.handle);

export { transactionsRoutes };
