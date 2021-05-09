import { Request, Response } from "express";
import { container } from "tsyringe";

import { TransferMoneyToUserUseCase } from "./transfer-money-to-user-use-case";

class TransferMoneyToUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { value, payer: payer_id, payee: payee_id } = request.body;

    const transferMoneyToUserUseCase = container.resolve(
      TransferMoneyToUserUseCase
    );

    await transferMoneyToUserUseCase.execute({
      value,
      payer_id,
      payee_id,
    });

    return response.status(201).send();
  }
}

export { TransferMoneyToUserController };
