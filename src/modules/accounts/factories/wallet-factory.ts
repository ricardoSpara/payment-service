import { ICreateWalletDTO } from "../dtos/icreate-wallet-dto";
import { Wallet } from "../entities/wallet";

class WalletFactory {
  static create(walletData: ICreateWalletDTO): Wallet {
    const wallet = new Wallet(walletData);

    return wallet;
  }
}

export { WalletFactory };
