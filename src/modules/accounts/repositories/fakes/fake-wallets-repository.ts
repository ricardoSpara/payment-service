import { Wallet } from "../../entities/wallet";
import { IWalletsRepository } from "../iwallet-repository";

class FakeWalletsRepository implements IWalletsRepository {
  private wallets: Wallet[] = [];

  async save(wallet: Wallet): Promise<void> {
    const findIndex = this.wallets.findIndex(
      (findWallet) => findWallet.id === wallet.id
    );

    if (findIndex !== -1) {
      this.wallets[findIndex] = wallet;
    } else {
      this.wallets.push(wallet);
    }
  }
}

export { FakeWalletsRepository };
