

import { CustomError } from '../../application/errors/custom.error';
import { User } from '../../domain/entities/user.entity';
import { UserEntity } from '../data/mysql/entities/user.entity';

export class UserMapper {

  static toDomain(entity: UserEntity): User {

    const { uid, name, email, username, is_active } = entity;

    if (!uid) throw CustomError.internalServer(`UserEntity: 'uid' is missing`);
    if (!name) throw CustomError.internalServer(`UserEntity: 'name' is missing`);
    if (!email) throw CustomError.internalServer(`UserEntity: 'email' is missing`);
    if (!username) throw CustomError.internalServer(`UserEntity: 'username' is missing`);

    return new User(
      uid,
      name,
      email,
      username,
      is_active
    );
  }

  static toDomainList(entities: UserEntity[]): User[] {
    return entities.map(UserMapper.toDomain);
  }

  static toPersistence( user: User, password?: string ): Partial<UserEntity> {
    const persistence: Partial<UserEntity> = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        username: user.username,
        is_active: user.isActive,
    };

    if (password) {
        persistence.password = password;
    }

    return persistence;
  }

}
