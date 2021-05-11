interface IMailProvider {
  notify(): Promise<void>;
}

export { IMailProvider };
