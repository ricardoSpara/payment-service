import { ICreateUserDTO } from "@modules/accounts/dtos/icreate-user-dto";
import { User } from "@modules/accounts/entities/user";
import { getRepository, Repository } from "typeorm";

import { IUsersRepository } from "../contracts/iusers-repository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    is_shopkeeper,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      full_name,
      email,
      password,
      cpf,
      cnpj,
      is_shopkeeper,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
