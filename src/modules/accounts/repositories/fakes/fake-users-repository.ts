import { ICreateUserDTO } from "@modules/accounts/dtos/icreate-user-dto";
import { User } from "@modules/accounts/entities/user";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "../contracts/iusers-repository";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuidV4() }, userData);

    this.users.push(user);

    return user;
  }

  async findByCpf(cpf: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.cpf === cpf);

    return findUser;
  }

  async findByCnpj(cnpj: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.cnpj === cnpj);

    return findUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }
}

export { FakeUsersRepository };
