/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Mi post
 *         content:
 *           type: string
 *           example: Contenido del post
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     PostCreate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: Nuevo post
 *         content:
 *           type: string
 *           example: Texto del post
 *
 *     PostsResponse:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 100
 *         results:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'
 */
export {};
