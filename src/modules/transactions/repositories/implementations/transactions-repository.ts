import { ICreateTransactionDTO } from "@modules/transactions/dtos/icreate-transaction-dto";
import { Transaction } from "@modules/transactions/entities/transaction";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/itransactions-repository";
import { getRepository, Repository } from "typeorm";

class TransactionsRepository implements ITrasanctionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async create({
    value,
    payer_id,
    payee_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.repository.create({
      value,
      payer_id,
      payee_id,
    });

    await this.repository.save(transaction);

    return transaction;
  }

  async save(transaction: Transaction): Promise<void> {
    await this.repository.save(transaction);
  }
}

export { TransactionsRepository };
