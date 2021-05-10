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
    type,
    wallet_id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      full_name,
      email,
      password,
      cpf,
      cnpj,
      type,
      wallet_id,
    });

    await this.repository.save(user);

    return user;
  }

  findById(id: string): Promise<User | undefined> {
    const user = this.repository.findOne({
      where: {
        id,
      },
      relations: ["wallet"],
    });

    return user;
  }

  async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.repository.findOne({
      where: {
        cpf,
      },
    });

    return user;
  }

  async findByCnpj(cnpj: string): Promise<User | undefined> {
    const user = this.repository.findOne({
      where: {
        cnpj,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export { UsersRepository };
