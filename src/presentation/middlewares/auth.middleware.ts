import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt";
import { CustomError } from "../../application/errors";
import { UserRepository } from "../../application/repositories/user.repository";

/**
 * Middleware factory para validar JWT
 * @param userRepository Repositorio de usuarios para buscar el usuario por uid
 */
export const validateJwt = (userRepository: UserRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        throw CustomError.unauthorized("Invalid or missing accessToken");
      }

      const accessToken = authorization.split(" ")[1] ?? ":D";

      const payload = await JwtAdapter.validateToken<{ uid: string }>(accessToken);

      if (!payload) {
        throw CustomError.unauthorized("Invalid accessToken");
      }

      const user = await userRepository.findById(payload.uid);

      if (!user) {
        throw CustomError.unauthorized("User inactive or not found");
      }

      req.body = req.body || {};
      req.body.user = user;

      next();
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
