import { Wallet } from "@modules/accounts/entities/wallet";
import { getRepository, Repository } from "typeorm";

import { IWalletsRepository } from "../iwallet-repository";

class WalletsRepository implements IWalletsRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = getRepository(Wallet);
  }

  async save(wallet: Wallet): Promise<void> {
    await this.repository.save(wallet);
  }
}

export { WalletsRepository };
