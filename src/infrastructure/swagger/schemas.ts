/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
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
 *         status:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             totalResults:
 *               type: integer
 *               example: 42
 *             currentPage:
 *               type: integer
 *               example: 1
 *             pageSize:
 *               type: integer
 *               example: 20
 *             results:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *
 *     AuthResponse:
 *       type: object
 *       required:
 *         - status
 *         - accessToken
 *         - user
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         accessToken:
 *           type: string
 *           description: JWT de acceso
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           type: object
 *           required:
 *             - uid
 *             - name
 *             - email
 *           properties:
 *             uid:
 *               type: string
 *               format: uuid
 *               example: 31348aee-cef6-4ffe-bc94-3cfcb0edcb0c
 *             name:
 *               type: string
 *               example: Mariana Olivas
 *             email:
 *               type: string
 *               format: email
 *               example: mariana@mail.com
 */
export {};
