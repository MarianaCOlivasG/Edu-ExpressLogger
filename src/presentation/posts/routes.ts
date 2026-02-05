

import { Router } from 'express';
import { PostRepositoryImpl } from '../../infrastructure/repositories/post.repository.impl';
import { PostController } from './controller';

export class PostRoutes {

  static get routes(): Router {
    const router = Router();

    const repository = new PostRepositoryImpl();
    const controller = new PostController(repository);

    router.post('/', controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findById);
    // router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
