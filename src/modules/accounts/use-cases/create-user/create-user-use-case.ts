import { ICreateUserDTO } from "@modules/accounts/dtos/icreate-user-dto";
import { ICreateWalletDTO } from "@modules/accounts/dtos/icreate-wallet-dto";
import { IHashProvider } from "@modules/accounts/providers/hash-provider/contracts/ihash-provider";
import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { inject, injectable } from "tsyringe";

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
