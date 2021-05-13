import { ICreateUserDTO } from "../dtos/icreate-user-dto";
import { User } from "../entities/user";

class UserFactory {
  static create(userData: ICreateUserDTO): User {
    const user = new User(userData);

    return user;
  }
}

export { UserFactory };
