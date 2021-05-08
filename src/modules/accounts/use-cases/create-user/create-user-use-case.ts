import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { ICreateWalletDTO } from "../../dtos/icreate-wallet-dto";
import { IHashProvider } from "../../providers/hash-provider/contracts/ihash-provider";
import { IUsersRepository } from "../../repositories/contracts/iusers-repository";
import { IWalletsRepository } from "../../repositories/contracts/iwallet-repository";

type IRequestCreateUser = ICreateUserDTO & ICreateWalletDTO;

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository
  ) {}

  async execute({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    is_shopkeeper,
    amount,
  }: Omit<IRequestCreateUser, "user_id">): Promise<void> {
    const hashedPassword = await this.hashProvider.generateHash(password);

    const { id: user_id } = await this.usersRepository.create({
      full_name,
      email,
      password: hashedPassword,
      cpf,
      cnpj,
      is_shopkeeper,
    });

    await this.walletsRepository.create({
      amount,
      user_id,
    });
  }
}

export { CreateUserUseCase };
