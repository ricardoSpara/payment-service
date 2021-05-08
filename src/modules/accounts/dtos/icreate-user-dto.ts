interface ICreateUserDTO {
  full_name: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
  is_shopkeeper: boolean;
}

export { ICreateUserDTO };
