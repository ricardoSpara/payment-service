import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

import { ICreateWalletDTO } from "../dtos/icreate-wallet-dto";

@Entity("wallets")
class Wallet {
  constructor(walletData: ICreateWalletDTO) {
    if (walletData) {
      this.id = walletData.id;
      this.amount = walletData.amount;
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
