interface ICreateUserDTO {
  full_name: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
  type: string;
}

export { ICreateUserDTO };
