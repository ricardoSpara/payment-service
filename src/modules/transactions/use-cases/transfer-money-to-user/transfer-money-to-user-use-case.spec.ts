import { User } from "@modules/accounts/entities/user";
import { FakeUsersRepository } from "@modules/accounts/repositories/fakes/fake-users-repository";
import { FakeWalletsRepository } from "@modules/accounts/repositories/fakes/fake-wallets-repository";
import { FakeAuthorizerProvider } from "@modules/transactions/providers/authorizer-provider/fakes/fake-authorizer-provider";
import { FakeMailProvider } from "@modules/transactions/providers/mail-provider/fakes/fake-mail-provider";
import { FakeTransactionsRepository } from "@modules/transactions/repositories/fakes/fake-transactions-repository";

import { AppError } from "@shared/errors/app-error";

import { TransferMoneyToUserUseCase } from "./transfer-money-to-user-use-case";

let fakeUsersRepository: FakeUsersRepository;
let fakeWalletsRepository: FakeWalletsRepository;
let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeAuthorizerProvider: FakeAuthorizerProvider;
let fakeMailProvider: FakeMailProvider;

let sut: TransferMoneyToUserUseCase;

interface IMakeUserResponse {
  commonUser: User;
  shopkeeper: User;
}

const makeUsers = async (): Promise<IMakeUserResponse> => {
  const walletCommonUser = await fakeWalletsRepository.create({
    amount: 100,
  });

  const commonUser = await fakeUsersRepository.create({
    full_name: "Payer doe",
    email: "johndoe@test.com",
    password: "test@123",
    type: "common",
    cpf: "941.161.440-02",
    wallet_id: walletCommonUser.id,
  });
  commonUser.wallet = walletCommonUser;

  const walletShopkeeper = await fakeWalletsRepository.create({
    amount: 100,
  });

  const shopkeeper = await fakeUsersRepository.create({
    full_name: "Payee doe",
    email: "johndoe2@test.com",
    password: "test@123",
    type: "shopkeeper",
    cnpj: "36.010.439/0001-42",
    wallet_id: walletShopkeeper.id,
  });
  shopkeeper.wallet = walletShopkeeper;

  return {
    commonUser,
    shopkeeper,
  };
};

describe("CreateTransaction", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeWalletsRepository = new FakeWalletsRepository();
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeAuthorizerProvider = new FakeAuthorizerProvider();
    fakeMailProvider = new FakeMailProvider();

    sut = new TransferMoneyToUserUseCase(
      fakeUsersRepository,
      fakeWalletsRepository,
      fakeTransactionsRepository,
      fakeAuthorizerProvider,
      fakeMailProvider
    );
  });

  it("should be able to create a new transaction", async () => {
    const { commonUser, shopkeeper } = await makeUsers();

    await sut.execute({
      payer_id: commonUser.id,
      payee_id: shopkeeper.id,
      value: 10,
    });

    const { transactions } = fakeTransactionsRepository;

    expect(transactions).toHaveLength(1);
    expect(transactions[0].value).toBe(10);
    expect(transactions[0].payer_id).toBe(commonUser.id);
    expect(transactions[0].payee_id).toBe(shopkeeper.id);
  });

  it("should be able notify payee when create a new transaction", async () => {
    const { commonUser, shopkeeper } = await makeUsers();

    const notify = jest.spyOn(fakeMailProvider, "notify");

    await sut.execute({
      payer_id: commonUser.id,
      payee_id: shopkeeper.id,
      value: 10,
    });

    expect(notify).toHaveBeenCalled();
  });

  it("should not be able to create a new transaction with the payer that does not exist", async () => {
    const { shopkeeper } = await makeUsers();

    await expect(
      sut.execute({
        payer_id: "non-existing-id",
        payee_id: shopkeeper.id,
        value: 10,
      })
    ).rejects.toEqual(new AppError("Payer does not exists"));
  });

  it("should not be able to create a new transaction with the payee that does not exist", async () => {
    const { commonUser } = await makeUsers();

    await expect(
      sut.execute({
        payer_id: commonUser.id,
        payee_id: "non-existing-id",
        value: 10,
      })
    ).rejects.toEqual(new AppError("Payee does not exists"));
  });

  it("should not be able to create a new transaction when the payer type is shopkeeper", async () => {
    const { commonUser, shopkeeper } = await makeUsers();

    await expect(
      sut.execute({
        payer_id: shopkeeper.id,
        payee_id: commonUser.id,
        value: 10,
      })
    ).rejects.toEqual(
      new AppError("Shopkeeper can not transfer to another account")
    );
  });

  it("should not be able to create a new transaction when the payer don't have enough money", async () => {
    const { commonUser, shopkeeper } = await makeUsers();

    await expect(
      sut.execute({
        payer_id: commonUser.id,
        payee_id: shopkeeper.id,
        value: 110,
      })
    ).rejects.toEqual(
      new AppError("Don't have enough money to make the transfer")
    );
  });

  it("should not be able to create a new transaction when is`nt autorized", async () => {
    const { commonUser, shopkeeper } = await makeUsers();

    jest
      .spyOn(fakeAuthorizerProvider, "isAuthorized")
      .mockImplementation(() => {
        return Promise.resolve(false);
      });

    await expect(
      sut.execute({
        payer_id: commonUser.id,
        payee_id: shopkeeper.id,
        value: 10,
      })
    ).rejects.toEqual(new AppError("Not authorized", 403));
  });
});
