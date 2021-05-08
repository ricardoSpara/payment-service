import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { IHashProvider } from "../../providers/hash-provider/contracts/ihash-provider";
import { IUsersRepository } from "../../repositories/contracts/iusers-repository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    is_shopkeeper,
  }: ICreateUserDTO): Promise<void> {
    const hashedPassword = await this.hashProvider.generateHash(password);

    await this.usersRepository.create({
      full_name,
      email,
      password: hashedPassword,
      cpf,
      cnpj,
      is_shopkeeper,
    });
  }
}

export { CreateUserUseCase };
