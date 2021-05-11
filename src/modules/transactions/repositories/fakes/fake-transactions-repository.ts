import { ICreateTransactionDTO } from "@modules/transactions/dtos/icreate-transaction-dto";
import { Transaction } from "@modules/transactions/entities/transaction";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/itransactions-repository";

class FakeTransactionsRepository implements ITrasanctionsRepository {
  public transactions: Transaction[] = [];

  async create({
    value,
    payer_id,
    payee_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();

    Object.assign(transaction, {
      value,
      payer_id,
      payee_id,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export { FakeTransactionsRepository };
