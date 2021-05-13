import { IUsersRepository } from "@modules/accounts/repositories/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/iwallet-repository";
import { ICreateTransactionDTO } from "@modules/transactions/dtos/icreate-transaction-dto";
import { TransactionFactory } from "@modules/transactions/factories/transaction-factory";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/itransactions-repository";
import { inject, injectable } from "tsyringe";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { AppError } from "@shared/errors/app-error";
import { generateId } from "@shared/helpers";
import { IAuthorizerProvider } from "@shared/providers/authorizer-provider/iauthorizer-provider";
import { IMailProvider } from "@shared/providers/mail-provider/imail-provider";

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

  @Transactional()
  async execute({
    value,
    payer_id,
    payee_id,
  }: Omit<ICreateTransactionDTO, "id">): Promise<void> {
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
    ]);

    const transaction = TransactionFactory.create({
      id: generateId(),
      payer_id: payer.id,
      payee_id: payee.id,
      value,
    });

    await this.trasanctionsRepository.save(transaction);

    const isAuthorized = await this.authorizerProvider.isAuthorized();

    if (!isAuthorized) {
      throw new AppError("Not authorized", 403);
    }

    await this.mailProvider.notify();
  }
}

export { TransferMoneyToUserUseCase };
