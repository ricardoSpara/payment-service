import { Wallet } from "../entities/wallet";

interface IWalletsRepository {
  save(wallet: Wallet): Promise<void>;
}

export { IWalletsRepository };
