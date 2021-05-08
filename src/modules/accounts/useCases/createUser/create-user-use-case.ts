import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { IUsersRepository } from "../../repositories/iusers-repository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    is_shopkeeper,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      full_name,
      email,
      password,
      cpf,
      cnpj,
      is_shopkeeper,
    });
  }
}

export { CreateUserUseCase };
