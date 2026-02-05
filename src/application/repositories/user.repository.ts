import { User } from "../../domain/entities/user.entity";

export interface UserRepository {
  findById(uid: string): Promise<User | null>;
}