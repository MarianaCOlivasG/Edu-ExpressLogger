import { JwtAdapter } from "../../../config/jwt";
import { CustomError } from "../../errors";
import { UserAccessToken } from "../../interfaces/auth/user-accesstoken.interface";

type SignToken = (payload: Object, duration?: number) => Promise<string | null>;

interface RenewUser {
  uid: string;
  name: string;
  email: string;
}

export class RenewTokenUseCase {

  constructor(
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(user: RenewUser): Promise<UserAccessToken> {

    const accessToken = await this.signToken({ uid: user.uid });

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
