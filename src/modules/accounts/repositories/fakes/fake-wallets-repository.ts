import { v4 as uuidV4 } from "uuid";

import { ICreateWalletDTO } from "../../dtos/icreate-wallet-dto";
import { Wallet } from "../../entities/wallet";
import { IWalletsRepository } from "../contracts/iwallet-repository";

class FakeWalletsRepository implements IWalletsRepository {
  private wallets: Wallet[] = [];

  async create(walletData: ICreateWalletDTO): Promise<void> {
    const wallet = new Wallet();
    Object.assign(wallet, { id: uuidV4() }, walletData);

    this.wallets.push(wallet);
  }
}

export { FakeWalletsRepository };
