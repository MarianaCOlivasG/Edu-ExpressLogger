


export class RegisterDto {

  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(obj: any): [string | undefined, RegisterDto?] {

     if (!obj || typeof obj !== 'object') {
      return ['Request body is required'];
    }

    const { name, email, password } = obj;

    if (!name) return ['name is required'];
    if (!email) return ['email is required'];
    if (!password) return ['password is required'];

    if ( password.length < 6 ) return [`'password' too short, min length 6`]

    if (typeof name !== 'string') return ['name must be a string'];
    if (typeof email !== 'string') return ['email must be a string'];
    if (typeof password !== 'string') return ['password must be a string'];


    return [undefined, new RegisterDto(name, email, password)];
  }
}
