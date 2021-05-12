import { ICreateTransactionDTO } from "../dtos/icreate-transaction-dto";
import { Transaction } from "../entities/transaction";

class TransactionFactory {
  static create(transactionData: ICreateTransactionDTO): Transaction {
    const transaction = new Transaction(transactionData);

    return transaction;
  }
}

export { TransactionFactory };
