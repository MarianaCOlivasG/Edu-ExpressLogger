import { Router } from 'express';
import { PostRepositoryImpl } from '../../infrastructure/repositories/post.repository.impl';
import { PostController } from './controller';

export class PostRoutes {

  /**
   * @openapi
   * tags:
   *   - name: Posts
   *     description: Gestión de posts
   */

  static get routes(): Router {
    const router = Router();

    const repository = new PostRepositoryImpl();
    const controller = new PostController(repository);

    /**
     * @openapi
     * /posts:
     *   post:
     *     tags:
     *       - Posts
     *     summary: Crear un post
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PostCreate'
     *     responses:
     *       201:
     *         description: Post creado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Post'
     *       400:
     *         description: Datos inválidos
     */
    router.post('/', controller.create);

    /**
     * @openapi
     * /posts:
     *   get:
     *     tags:
     *       - Posts
     *     summary: Obtener todos los posts paginados
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           minimum: 1
     *           default: 1
     *         description: Página actual
     *
     *       - in: query
     *         name: pageSize
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           default: 20
     *         description: Cantidad de resultados por página
     *
     *       - in: query
     *         name: query_search
     *         schema:
     *           type: string
     *         required: false
     *         description: Texto para búsqueda
     *
     *     responses:
     *       200:
     *         description: Lista de posts
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PostsResponse'
     */
    router.get('/', controller.findAll);

    /**
     * @openapi
     * /posts/{id}:
     *   get:
     *     tags:
     *       - Posts
     *     summary: Obtener post por ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         example: "123"
     *     responses:
     *       200:
     *         description: Post encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Post'
     *       404:
     *         description: Post no encontrado
     */
    router.get('/:id', controller.findById);

    /**
     * @openapi
     * /posts/{id}:
     *   delete:
     *     tags:
     *       - Posts
     *     summary: Eliminar un post
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         example: "123"
     *     responses:
     *       204:
     *         description: Post eliminado correctamente
     *       404:
     *         description: Post no encontrado
     */
    router.delete('/:id', controller.delete);

    return router;
  }
}
