import { NextFunction, Request, Response } from 'express';

import { LoginDto, RegisterDto } from '../../application/dtos/auth';
import { AuthRepository } from '../../application/repositories/auth.repository';
import { LoginUserUseCase, RegisterUserUseCase, RenewTokenUseCase } from '../../application/use-cases/auth';



export class AuthController {

  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  // POST /auth/login
  login = (req: Request, res: Response, next: NextFunction) => {

    const [error, dto] = LoginDto.create(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }

    new LoginUserUseCase(this.authRepository)
      .execute(dto!)
      .then(result => res.json(result))
      .catch(next);
  };

  // POST /auth/register
  register = (req: Request, res: Response, next: NextFunction) => {

    const [error, dto] = RegisterDto.create(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error
      });
    }

    new RegisterUserUseCase(this.authRepository)
      .execute(dto!)
      .then(result => res.status(201).json(result))
      .catch(next);
  };

  // GET /auth/renew
  renew = (req: Request, res: Response, next: NextFunction) => {

    // req.user viene del AuthMiddleware
    new RenewTokenUseCase()
      .execute(req.body.user)
      .then(result => res.json(result))
      .catch(next);
  };
}
