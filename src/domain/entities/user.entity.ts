export class User {

  constructor(
    public readonly uid: string,
    public readonly name: string,
    public readonly email: string,
    public readonly username: string,
    public readonly isActive: boolean,
  ) {}

}
