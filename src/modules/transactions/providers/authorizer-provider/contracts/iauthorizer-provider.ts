interface IAuthorizerProvider {
  isAuthorized(): Promise<boolean>;
}

export { IAuthorizerProvider };
