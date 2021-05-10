import { getRepository, Repository } from "typeorm";

import { ICreateWalletDTO } from "../../dtos/icreate-wallet-dto";
import { Wallet } from "../../entities/wallet";
import { IWalletsRepository } from "../contracts/iwallet-repository";

class WalletsRepository implements IWalletsRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = getRepository(Wallet);
  }

  async create({ amount }: ICreateWalletDTO): Promise<Wallet> {
    const wallet = this.repository.create({
      amount,
    });

    await this.repository.save(wallet);

    return wallet;
  }

  async save(wallet: Wallet): Promise<void> {
    await this.repository.save(wallet);
  }
}

export { WalletsRepository };
