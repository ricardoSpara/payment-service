import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/users-repository";
import { IUsersRepository } from "../../modules/accounts/repositories/iusers-repository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
