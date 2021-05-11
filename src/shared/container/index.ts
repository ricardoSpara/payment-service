import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/users-repository";
import { WalletsRepository } from "@modules/accounts/repositories/implementations/wallets-repository";
import { ITrasanctionsRepository } from "@modules/transactions/repositories/contracts/itransactions-repository";
import { TransactionsRepository } from "@modules/transactions/repositories/implementations/transactions-repository";
import { container } from "tsyringe";

import { IAuthorizerProvider } from "@shared/providers/authorizer-provider/iauthorizer-provider";
import { AuthorizerProvider } from "@shared/providers/authorizer-provider/implementations/authorizer-provider";
import { IHashProvider } from "@shared/providers/hash-provider/ihash-provider";
import { BCryptHashProvider } from "@shared/providers/hash-provider/implementations/bcrypt-hash-provider";
import { IMailProvider } from "@shared/providers/mail-provider/imail-provider";
import { MailProvider } from "@shared/providers/mail-provider/implementations/mail-provider";

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
