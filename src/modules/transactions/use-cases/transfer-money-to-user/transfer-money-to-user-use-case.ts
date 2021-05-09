import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { ICreateTransactionDTO } from "@modules/transactions/dtos/icreate-transaction-dto";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/contracts/itransactions-repository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/app-error";

@injectable()
class TransferMoneyToUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,
    @inject("TrasanctionsRepository")
    private trasanctionsRepository: ITrasanctionsRepository
  ) {}

  async execute({
    value,
    payer_id,
    payee_id,
  }: ICreateTransactionDTO): Promise<void> {
    const payer = await this.usersRepository.findById(payer_id);
    const payee = await this.usersRepository.findById(payee_id);

    if (!payer) {
      throw new AppError("Payer does not exists");
    }

    if (!payee) {
      throw new AppError("Payee does not exists");
    }

    if (payer.getType() === "shopkeeper") {
      throw new AppError("Shopkeeper can not transfer to another account");
    }

    if (payer.wallet.getAmount() < value) {
      throw new AppError("Don't have enough money to make the transfer");
    }

    payer.wallet.decrementAmount(value);
    payee.wallet.incrementAmount(value);

    await this.walletsRepository.save(payer.wallet);
    await this.walletsRepository.save(payee.wallet);

    console.log(`payer.wallet.getAmount()`, payer.wallet.getAmount());
    console.log(`payee.wallet.getAmount()`, payee.wallet.getAmount());
  }
}

export { TransferMoneyToUserUseCase };
