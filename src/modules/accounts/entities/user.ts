import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Wallet } from "./wallet";

@Entity("users")
class User {
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cpf?: string;

  @Column()
  cnpj?: string;

  @Column()
  type: string;

  @Column()
  wallet_id: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Wallet)
  @JoinColumn({ name: "wallet_id" })
  wallet: Wallet;

  getType(): string {
    return this.type;
  }
}

const permitedUserTypes: Array<string> = ["common", "shopkeeper"];

export { User, permitedUserTypes };
