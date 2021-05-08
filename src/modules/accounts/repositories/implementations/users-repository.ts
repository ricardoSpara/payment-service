import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { User } from "../../entities/user";
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
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      full_name,
      email,
      password,
      cpf,
      cnpj,
      is_shopkeeper,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
