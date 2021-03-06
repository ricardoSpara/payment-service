import { UserFactory } from "@modules/accounts/factories/user-factory";
import { FakeUsersRepository } from "@modules/accounts/repositories/fakes/fake-users-repository";
import { FakeWalletsRepository } from "@modules/accounts/repositories/fakes/fake-wallets-repository";

import { AppError } from "@shared/errors/app-error";
import { generateId } from "@shared/helpers";
import { FakeHashProvider } from "@shared/providers/hash-provider/fakes/fake-hash-provider";

import { CreateUserUseCase } from "./create-user-use-case";

let fakeUsersRepository: FakeUsersRepository;
let fakeWalletsRepository: FakeWalletsRepository;
let fakeHashProvider: FakeHashProvider;

let sut: CreateUserUseCase;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeWalletsRepository = new FakeWalletsRepository();
    fakeHashProvider = new FakeHashProvider();

    sut = new CreateUserUseCase(
      fakeUsersRepository,
      fakeWalletsRepository,
      fakeHashProvider
    );
  });

  it("should be able to create a new common user", async () => {
    const user = await sut.execute({
      amount: 100,
      full_name: "John doe",
      email: "johndoe@test.com",
      password: "test@123",
      type: "common",
      cpf: "941.161.440-02",
    });

    expect(user).toHaveProperty("id");
    expect(user.cpf).toBeTruthy();
    expect(user.cnpj).toBeFalsy();
  });

  it("should be able to create a new shopkeeper user", async () => {
    const user = await sut.execute({
      amount: 100,
      full_name: "John doe",
      email: "johndoe@test.com",
      password: "test@123",
      type: "shopkeeper",
      cnpj: "36.010.439/0001-42",
    });

    expect(user).toHaveProperty("id");
    expect(user.cpf).toBeFalsy();
    expect(user.cnpj).toBeTruthy();
  });

  it("should not be able to create a new user with same e-mail another", async () => {
    const userData = {
      id: generateId(),
      amount: 100,
      full_name: "John doe",
      email: "johndoe@test.com",
      password: "test@123",
      type: "common",
      cpf: "941.161.440-02",
    };

    const user = UserFactory.create(userData);
    fakeUsersRepository.save(user);

    await expect(sut.execute(userData)).rejects.toEqual(
      new AppError("Email address already used")
    );
  });

  it("should not be able to create a new user with same cpf another", async () => {
    const userData = {
      id: generateId(),
      amount: 100,
      full_name: "John doe",
      email: "johndoe@test.com",
      password: "test@123",
      type: "common",
      cpf: "941.161.440-02",
    };

    const user = UserFactory.create(userData);
    fakeUsersRepository.save(user);

    userData.email = "johndoe2@test.com";

    await expect(sut.execute(userData)).rejects.toEqual(
      new AppError("Cpf already used")
    );
  });

  it("should not be able to create a new user with same cnpj another", async () => {
    const userData = {
      id: generateId(),
      amount: 100,
      full_name: "John doe",
      email: "johndoe@test.com",
      password: "test@123",
      type: "shopkeeper",
      cnpj: "36.010.439/0001-42",
    };

    const user = UserFactory.create(userData);
    fakeUsersRepository.save(user);

    userData.email = "johndoe2@test.com";

    await expect(sut.execute(userData)).rejects.toEqual(
      new AppError("Cnpj already used")
    );
  });

  it("should not be able to create a new user with an unknown type", async () => {
    const userData = {
      id: generateId(),
      amount: 100,
      full_name: "John doe",
      email: "johndoe@test.com",
      password: "test@123",
      type: "unknown type",
      cnpj: "36.010.439/0001-42",
    };

    await expect(sut.execute(userData)).rejects.toEqual(
      new AppError("Type of user does not exist")
    );
  });
});
