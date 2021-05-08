import { ICreateUserDTO } from "../../dtos/icreate-user-dto";

interface IUsersRepository {
  create({
    full_name,
    email,
    password,
    cpf,
    cnpj,
    is_shopkeeper,
  }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
