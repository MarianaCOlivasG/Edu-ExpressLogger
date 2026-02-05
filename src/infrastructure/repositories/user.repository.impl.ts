

import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../data/mysql/entities/user.entity";
import { UserRepository } from "../../application/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { MySQLDatabase } from "../data/mysql";

export class UserRepositoryImpl implements UserRepository {

  private readonly repo: Repository<UserEntity>;

  constructor() {
    this.repo = MySQLDatabase
      .getDataSource()
      .getRepository(UserEntity);
  }

  async findById(uid: string): Promise<User | null> {

    const entity = await this.repo.findOne({
      where: { uid, is_active: true },
    });

    if (!entity) return null;

    return UserMapper.toDomain(entity);
  }
}
