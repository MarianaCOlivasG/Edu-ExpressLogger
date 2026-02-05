import { User } from "../../domain/entities/user.entity";
import { LoginDto, RegisterDto } from "../dtos/auth";


export abstract class AuthRepository {

    abstract login( loginDto: LoginDto ): Promise<User>

    abstract renew?(): Promise<User>

    abstract register( registerDto: RegisterDto ): Promise<User>

}