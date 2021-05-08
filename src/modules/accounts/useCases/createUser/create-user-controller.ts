import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./create-user-use-case";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      full_name,
      email,
      password,
      cpf,
      cnpj,
      is_shopkeeper,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      full_name,
      email,
      password,
      cpf,
      cnpj,
      is_shopkeeper,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
