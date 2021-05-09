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

  incrementAmount(value: number): void {
    this.amount = parseFloat(String(this.amount)) + parseFloat(String(value));
  }

  decrementAmount(value: number): void {
    this.amount = parseFloat(String(this.amount)) - parseFloat(String(value));
  }
}

export { Wallet };
