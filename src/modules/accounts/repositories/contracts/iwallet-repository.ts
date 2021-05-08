import { ICreateWalletDTO } from "../../dtos/icreate-wallet-dto";

interface IWalletsRepository {
  create({ amount, user_id }: ICreateWalletDTO): Promise<void>;
}

export { IWalletsRepository };
