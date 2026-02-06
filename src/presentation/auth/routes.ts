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

    /**
     * @openapi
     * /auth/login:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Login de usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginDto'
     *     responses:
     *       200:
     *         description: Login exitoso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       400:
     *         description: Credenciales inválidas
     */
    router.post('/login', controller.login);

    /**
     * @openapi
     * /auth/register:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Registro de usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterDto'
     *     responses:
     *       201:
     *         description: Usuario registrado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       400:
     *         description: Error de validación
     */
    router.post('/register', controller.register);

    /**
     * @openapi
     * /auth/renew:
     *   get:
     *     tags:
     *       - Auth
     *     summary: Renovar access token
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Token renovado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/AuthResponse'
     *       401:
     *         description: Token inválido o expirado
     */
    router.get('/renew', validateJwt(userRepository), controller.renew);

    return router;
  }
}
