import { JwtAdapter } from "../../../config/jwt";
import { LoginDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { UserAccessToken } from "../../interfaces/auth/user-accesstoken.interface";
import { AuthRepository } from "../../repositories/auth.repository";

type SignToken = (payload: Object, duration?: number) => Promise<string | null>;

export class LoginUserUseCase {

  constructor(
    private readonly repository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(loginDto: LoginDto): Promise<any> {

    const user = await this.repository.login(loginDto);

    const accessToken = await this.signToken({
      uid: user.uid,
      email: user.email,
    });

    if (!accessToken) {
      throw CustomError.internalServer('Error generating accessToken');
    }

    return {
      status: true,
      accessToken,
      user: {
        uid: user.uid,
        name: user.name,
        email: user.email,
      },
    };
  }
}
