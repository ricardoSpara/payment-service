import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { ICreateTransactionDTO } from "@modules/transactions/dtos/icreate-transaction-dto";
import { IAuthorizerProvider } from "@modules/transactions/providers/authorizer-provider/contracts/iauthorizer-provider";
import { IMailProvider } from "@modules/transactions/providers/mail-provider/contracts/imail-provider";
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
    private trasanctionsRepository: ITrasanctionsRepository,
    @inject("AuthorizerProvider")
    private authorizerProvider: IAuthorizerProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute({
    value,
    payer_id,
    payee_id,
  }: ICreateTransactionDTO): Promise<void> {
    const payer = await this.usersRepository.findById(payer_id);

    if (!payer) {
      throw new AppError("Payer does not exists");
    }

    const payee = await this.usersRepository.findById(payee_id);

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

    await Promise.all([
      this.walletsRepository.save(payer.wallet),
      this.walletsRepository.save(payee.wallet),
      this.trasanctionsRepository.create({
        payer_id: payer.id,
        payee_id: payee.id,
        value,
      }),
    ]);

    const isAuthorized = await this.authorizerProvider.isAuthorized();

    if (!isAuthorized) {
      throw new AppError("Not authorized", 401);
    }

    await this.mailProvider.notify();
  }
}

export { TransferMoneyToUserUseCase };
