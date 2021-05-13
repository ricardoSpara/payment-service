import { Transaction } from "@modules/transactions/entities/transaction";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/itransactions-repository";

class FakeTransactionsRepository implements ITrasanctionsRepository {
  public transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<void> {
    const findIndex = this.transactions.findIndex(
      (findTransaction) => findTransaction.id === transaction.id
    );

    if (findIndex !== -1) {
      this.transactions[findIndex] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }
}

export { FakeTransactionsRepository };
