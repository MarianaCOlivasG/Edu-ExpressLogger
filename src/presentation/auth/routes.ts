import { Router } from 'express';

import { AuthController } from './controller';

import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repository.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { validateJwt } from '../middlewares/auth.middleware';

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    // Infra
    const authRepository = new AuthRepositoryImpl();
    const userRepository = new UserRepositoryImpl();

    // Controller
    const controller = new AuthController(
      authRepository,
    );

    // Routes
    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get("/renew", validateJwt(userRepository), controller.renew);

    return router;
  }
}
