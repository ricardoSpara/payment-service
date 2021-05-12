import { Transaction } from "../entities/transaction";

interface ITrasanctionsRepository {
  save(transaction: Transaction): Promise<void>;
}

export { ITrasanctionsRepository };
