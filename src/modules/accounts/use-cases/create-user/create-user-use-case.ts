import { ICreateUserDTO } from "@modules/accounts/dtos/icreate-user-dto";
import { ICreateWalletDTO } from "@modules/accounts/dtos/icreate-wallet-dto";
import { permitedUserTypes, User } from "@modules/accounts/entities/user";
import { IHashProvider } from "@modules/accounts/providers/hash-provider/contracts/ihash-provider";
import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/app-error";

type IRequestCreateUser = ICreateUserDTO & ICreateWalletDTO;

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    type,
    amount,
  }: Omit<IRequestCreateUser, "user_id">): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError("Email address already used");
    }

    if (!permitedUserTypes.includes(type)) {
      throw new AppError("Type of user does not exist");
    }

    if (type === "common" && cpf) {
      const checkCpfExists = await this.usersRepository.findByCpf(cpf);

      if (checkCpfExists) {
        throw new AppError("Cpf already used");
      }
    }

    if (type === "shopkeeper" && cnpj) {
      const checkCnpjExists = await this.usersRepository.findByCnpj(cnpj);

      if (checkCnpjExists) {
        throw new AppError("Cnpj already used");
      }
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      full_name,
      email,
      password: hashedPassword,
      cpf,
      cnpj,
      type,
    });

    await this.walletsRepository.create({
      amount,
      user_id: user.id,
    });

    return user;
  }
}

export { CreateUserUseCase };
