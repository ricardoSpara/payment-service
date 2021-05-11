import { Wallet } from "@modules/accounts/entities/wallet";

import { ICreateWalletDTO } from "../dtos/icreate-wallet-dto";

interface IWalletsRepository {
  create({ amount }: ICreateWalletDTO): Promise<Wallet>;
  save(wallet: Wallet): Promise<void>;
}

export { IWalletsRepository };
