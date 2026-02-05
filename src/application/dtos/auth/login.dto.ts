

export class LoginDto {

  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(obj: any): [string | undefined, LoginDto?] {

     if (!obj || typeof obj !== 'object') {
      return ['Request body is required'];
    }

    const { email, password } = obj;

    if (!email) return ['email is required'];
    if (!password) return ['password is required'];

    if (typeof email !== 'string') return ['email must be a string'];
    if (typeof password !== 'string') return ['password must be a string'];

    return [undefined, new LoginDto(email, password)];
  }
}
