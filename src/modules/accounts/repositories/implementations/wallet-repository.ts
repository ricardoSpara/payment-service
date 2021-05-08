import { getRepository, Repository } from "typeorm";

import { ICreateWalletDTO } from "../../dtos/icreate-wallet-dto";
import { Wallet } from "../../entities/wallet";
import { IWalletsRepository } from "../contracts/iwallet-repository";

class WalletsRepository implements IWalletsRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = getRepository(Wallet);
  }

  async create({ amount, user_id }: ICreateWalletDTO): Promise<void> {
    const wallet = this.repository.create({
      amount,
      user_id,
    });

    await this.repository.save(wallet);
  }
}

export { WalletsRepository };
