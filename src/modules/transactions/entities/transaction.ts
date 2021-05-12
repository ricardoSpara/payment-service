import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

import { ICreateTransactionDTO } from "../dtos/icreate-transaction-dto";

@Entity("transactions")
class Transaction {
  constructor(transactionData: ICreateTransactionDTO) {
    if (transactionData) {
      this.id = transactionData.id;
      this.payee_id = transactionData.payee_id;
      this.payer_id = transactionData.payer_id;
      this.value = transactionData.value;
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  value: number;

  @Column()
  payer_id: string;

  @Column()
  payee_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Transaction };
