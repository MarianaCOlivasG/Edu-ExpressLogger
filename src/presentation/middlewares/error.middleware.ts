import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../application/errors/custom.error';
import { logger } from '../../infrastructure/logger/logger';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {

  if (err instanceof CustomError) {

    if (err.statusCode >= 500) {
      logger.error({
        message: err.message,
        statusCode: err.statusCode,
        path: req.path,
        method: req.method,
        body: req.body,
        stack: err.stack
      });
    } else {
      logger.warn({
        message: err.message,
        statusCode: err.statusCode,
        path: req.path,
        method: req.method
      });
    }

    return res.status(err.statusCode).json({
      status: false,
      message: err.message
    });
  }

  // Cualquier error inesperado
  logger.error({
    message: 'Unhandled error',
    error: err,
    path: req.path,
    method: req.method,
    body: req.body
  });

  return res.status(500).json({
    status: false,
    message: 'Internal Server Error'
  });
}
