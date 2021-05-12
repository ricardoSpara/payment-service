import { Wallet } from "@modules/accounts/entities/wallet";

interface IWalletsRepository {
  save(wallet: Wallet): Promise<void>;
}

export { IWalletsRepository };
