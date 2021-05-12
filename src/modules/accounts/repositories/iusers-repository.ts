import { User } from "../entities/user";

interface IUsersRepository {
  save(user: User): Promise<void>;

  findById(id: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByCnpj(cnpj: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };
