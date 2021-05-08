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
}

export { IUsersRepository };
