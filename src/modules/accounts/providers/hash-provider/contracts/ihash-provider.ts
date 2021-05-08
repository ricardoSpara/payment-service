interface IHashProvider {
  generateHash(payload: string): Promise<string>;
}

export { IHashProvider };
