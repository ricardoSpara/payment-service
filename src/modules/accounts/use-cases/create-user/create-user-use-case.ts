import { ICreateUserDTO } from "@modules/accounts/dtos/icreate-user-dto";
import { permitedUserTypes, User } from "@modules/accounts/entities/user";
import { UserFactory } from "@modules/accounts/factories/user-factory";
import { IUsersRepository } from "@modules/accounts/repositories/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/iwallet-repository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/app-error";
import { generateId } from "@shared/helpers";
import { IHashProvider } from "@shared/providers/hash-provider/ihash-provider";

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
  }: Omit<ICreateUserDTO, "id">): Promise<User> {
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

    const user = UserFactory.create({
      full_name,
      email,
      password: hashedPassword,
      cpf,
      cnpj,
      type,
      amount,
      id: generateId(),
    });

    await this.walletsRepository.save(user.wallet);
    await this.usersRepository.save(user);

    return user;
  }
}

export { CreateUserUseCase };
