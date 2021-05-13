import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { generateId } from "../../../shared/helpers";
import { ICreateUserDTO } from "../dtos/icreate-user-dto";
import { WalletFactory } from "../factories/wallet-factory";
import { Wallet } from "./wallet";

@Entity("users")
class User {
  constructor(userData: ICreateUserDTO) {
    if (userData) {
      this.id = userData.id;
      this.full_name = userData.full_name;
      this.email = userData.email;
      this.password = userData.password;
      this.cpf = userData.cpf;
      this.cnpj = userData.cnpj;
      this.type = userData.type;

      const wallet = WalletFactory.create({
        amount: userData.amount,
        id: generateId(),
      });

      this.wallet = wallet;
      this.wallet_id = wallet.id;
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
