import { container } from "tsyringe";

import { IHashProvider } from "../../modules/accounts/providers/hash-provider/contracts/ihash-provider";
import { BCryptHashProvider } from "../../modules/accounts/providers/hash-provider/implementations/bcrypt-hash-provider";
import { IUsersRepository } from "../../modules/accounts/repositories/contracts/iusers-repository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/users-repository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
