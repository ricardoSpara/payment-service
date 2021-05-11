import { ICreateTransactionDTO } from "../dtos/icreate-transaction-dto";
import { Transaction } from "../entities/transaction";

interface ITrasanctionsRepository {
  create({
    value,
    payee_id,
    payer_id,
  }: ICreateTransactionDTO): Promise<Transaction>;
}

export { ITrasanctionsRepository };
