import { IHashProvider } from "@modules/accounts/providers/hash-provider/contracts/ihash-provider";
import { BCryptHashProvider } from "@modules/accounts/providers/hash-provider/implementations/bcrypt-hash-provider";
import { IUsersRepository } from "@modules/accounts/repositories/contracts/iusers-repository";
import { IWalletsRepository } from "@modules/accounts/repositories/contracts/iwallet-repository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/users-repository";
import { WalletsRepository } from "@modules/accounts/repositories/implementations/wallet-repository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IWalletsRepository>(
  "WalletsRepository",
  WalletsRepository
);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
