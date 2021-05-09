import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("transactions")
class Transaction {
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
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
