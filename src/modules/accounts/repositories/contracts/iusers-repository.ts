import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { User } from "../../entities/user";

interface IUsersRepository {
  create({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    type,
    wallet_id,
  }: ICreateUserDTO): Promise<User>;

  findById(id: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByCnpj(cnpj: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };
