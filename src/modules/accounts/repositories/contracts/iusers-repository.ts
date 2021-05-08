import { ICreateUserDTO } from "../../dtos/icreate-user-dto";
import { User } from "../../entities/user";

interface IUsersRepository {
  create({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    is_shopkeeper,
  }: ICreateUserDTO): Promise<User>;

  findByCpf(cpf: string): Promise<User | undefined>;
  findByCnpj(cnpj: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };
