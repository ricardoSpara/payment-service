import { v4 as uuidV4 } from "uuid";

import { ICreateWalletDTO } from "../../dtos/icreate-wallet-dto";
import { Wallet } from "../../entities/wallet";
import { IWalletsRepository } from "../contracts/iwallet-repository";

class FakeWalletsRepository implements IWalletsRepository {
  private wallets: Wallet[] = [];

  async create(walletData: ICreateWalletDTO): Promise<Wallet> {
    const wallet = new Wallet();
    Object.assign(wallet, { id: uuidV4() }, walletData);

    this.wallets.push(wallet);

    return wallet;
  }

  async save(wallet: Wallet): Promise<void> {
    const findIndex = this.wallets.findIndex(
      (findWallet) => findWallet.id === wallet.id
    );

    this.wallets[findIndex] = wallet;
  }
}

export { FakeWalletsRepository };
