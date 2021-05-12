import { User } from "@modules/accounts/entities/user";

import { IUsersRepository } from "../iusers-repository";

class FakeUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    if (findIndex !== -1) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
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
