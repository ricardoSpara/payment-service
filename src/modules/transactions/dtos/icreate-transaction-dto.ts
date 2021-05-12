interface ICreateTransactionDTO {
  id: string;
  value: number;
  payer_id: string;
  payee_id: string;
}

export { ICreateTransactionDTO };
