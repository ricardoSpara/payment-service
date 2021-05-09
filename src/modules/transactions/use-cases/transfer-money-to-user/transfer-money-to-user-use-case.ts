import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { ICreateTransactionDTO } from "@modules/transactions/dtos/icreate-transaction-dto";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/contracts/itransactions-repository";
import { inject, injectable } from "tsyringe";

// import { AppError } from "@shared/errors/app-error";

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
    console.log(value, payer_id, payee_id);
  }
}

export { TransferMoneyToUserUseCase };
