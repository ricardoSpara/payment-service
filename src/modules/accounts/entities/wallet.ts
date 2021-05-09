import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("wallets")
class Wallet {
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  getAmount(): number {
    return this.amount;
  }
}

export { Wallet };
