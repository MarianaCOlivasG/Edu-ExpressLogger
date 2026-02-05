import { Repository } from 'typeorm';

import { MySQLDatabase } from '../data/mysql';
import { UserEntity } from '../data/mysql/entities/user.entity';

import { AuthRepository } from '../../application/repositories/auth.repository';
import { LoginDto, RegisterDto } from '../../application/dtos/auth';

import { User } from '../../domain/entities/user.entity';

import { CustomError } from '../../application/errors/custom.error';
import { BcryptAdapter } from '../../config/bcrypt';
import { UserMapper } from '../mappers/user.mapper';

export class AuthRepositoryImpl implements AuthRepository {

  private readonly repo: Repository<UserEntity>;

  constructor(
    private readonly hashPassword = BcryptAdapter.hash,
    private readonly comparePassword = BcryptAdapter.compare,
  ) {
    this.repo = MySQLDatabase
      .getDataSource()
      .getRepository(UserEntity);
  }

  // LOGIN
  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.repo.findOne({
      where: {
        email: email.toLowerCase(),
        is_active: true,
      },
      select: ['uid', 'name', 'email', 'username', 'password', 'is_active'],
    });

    if (!user) {
      throw CustomError.badRequest('Credenciales incorrectas');
    }

    const isValid = this.comparePassword(password, user.password!);

    if (!isValid) {
      throw CustomError.badRequest('Credenciales incorrectas');
    }

    return UserMapper.toDomain(user);
  }

  // REGISTER
  async register(registerDto: RegisterDto): Promise<User> {

    const { name, email, password } = registerDto;

    const exists = await this.repo.findOne({
      where: [
        { email: email.toLowerCase() },
      ]
    });

    if (exists) {
      throw CustomError.badRequest(
        `Ya existe un usuario con el email '${email.toLowerCase()}'`
      );
    }

    const entity = this.repo.create({
      name,
      email: email.toLowerCase(),
      username: email.toLowerCase(),
      password: this.hashPassword(password),
      is_active: true,
    });

    try {
      const saved = await this.repo.save(entity);
      return UserMapper.toDomain(saved);
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  
}
