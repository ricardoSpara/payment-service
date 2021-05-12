interface ICreateUserDTO {
  id: string;
  full_name: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
  type: string;
  amount: number;
}

export { ICreateUserDTO };
