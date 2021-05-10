import { IHashProvider } from "@modules/accounts/providers/hash-provider/contracts/ihash-provider";
import { BCryptHashProvider } from "@modules/accounts/providers/hash-provider/implementations/bcrypt-hash-provider";
import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/users-repository";
import { WalletsRepository } from "@modules/accounts/repositories/implementations/wallets-repository";
import { IAuthorizerProvider } from "@modules/transactions/providers/authorizer-provider/contracts/iauthorizer-provider";
import { AuthorizerProvider } from "@modules/transactions/providers/authorizer-provider/implementations/authorizer-provider";
import { IMailProvider } from "@modules/transactions/providers/mail-provider/contracts/imail-provider";
import { MailProvider } from "@modules/transactions/providers/mail-provider/implementations/mail-provider";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/contracts/itransactions-repository";
import { TransactionsRepository } from "@modules/transactions/repositories/implementations/transactions-repository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IWalletsRepository>(
  "WalletsRepository",
  WalletsRepository
);

container.registerSingleton<ITrasanctionsRepository>(
  "TrasanctionsRepository",
  TransactionsRepository
);

container.registerSingleton<IAuthorizerProvider>(
  "AuthorizerProvider",
  AuthorizerProvider
);

container.registerSingleton<IMailProvider>("MailProvider", MailProvider);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
